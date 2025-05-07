import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

//vidu api
//http://localhost:3000/api/thongke?type=REN_LUYEN&maCD=CD_KTPM_K17&hocKy=2
//http://localhost:3000/api/thongke?type=DOAN_PHI&maCD=CD_KTPM_K17&hocKy=1&trangThaiDoanPhi=DA_DONG


// GET - Thống kê tổng hợp (Đoàn phí hoặc Rèn luyện)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type'); // DOAN_PHI hoặc REN_LUYEN
  const maCD = searchParams.get('maCD');
  const hocKyStr = searchParams.get('hocKy');

  // 1. Validate đầu vào cơ bản
  if (!type) {
    return NextResponse.json({ message: 'Thiếu tham số "type" (loại thống kê).' }, { status: 400 });
  }
  if (!maCD) {
    return NextResponse.json({ message: 'Thiếu tham số "maCD" (Mã Chi Đoàn).' }, { status: 400 });
  }
  if (!hocKyStr) {
    return NextResponse.json({ message: 'Thiếu tham số "hocKy" (Học Kỳ).' }, { status: 400 });
  }

  const parsedHocKy = parseInt(hocKyStr, 10);
  if (isNaN(parsedHocKy) || parsedHocKy < 1) { // Không giới hạn học kỳ tối đa vì rèn luyện có thể nhiều hơn 8
    return NextResponse.json({ message: 'Học kỳ không hợp lệ. Phải là số nguyên dương.' }, { status: 400 });
  }

  try {
    // 2. Kiểm tra sự tồn tại của Chi Đoàn
    const chiDoanExists = await prisma.chiDoan.findUnique({ where: { maCD } });
    if (!chiDoanExists) {
      return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy.` }, { status: 404 });
    }

    // 3. Lấy danh sách Đoàn viên của Chi Đoàn
    const doanViens = await prisma.doanVien.findMany({
      where: { maCD: maCD },
      include: {
        doanPhi: type.toUpperCase() === 'DOAN_PHI' ? true : undefined,
        renLuyens: type.toUpperCase() === 'REN_LUYEN' ? { where: { hocKy: parsedHocKy } } : undefined,
      },
      orderBy: [{ hoDV: 'asc' }, { tenDV: 'asc' }],
    });

    // 4. Xử lý dựa trên loại thống kê
    let resultData;

    if (type.toUpperCase() === 'DOAN_PHI') {
      const trangThaiDoanPhi = searchParams.get('trangThaiDoanPhi')?.toUpperCase() || 'ALL';
      const validTrangThaiDP = ['ALL', 'DA_DONG', 'CHUA_DONG'];
      if (!validTrangThaiDP.includes(trangThaiDoanPhi)) {
          return NextResponse.json({ message: 'Trạng thái Đoàn phí không hợp lệ.' }, { status: 400 });
      }
      if (parsedHocKy > 8) { // Đoàn phí chỉ có 8 học kỳ
        return NextResponse.json({ message: 'Học kỳ cho Đoàn phí không hợp lệ (chỉ từ 1 đến 8).' }, { status: 400 });
      }
      const fieldNameHocKyDP = `hk${parsedHocKy}` as keyof typeof prisma.doanPhi.fields;

      resultData = doanViens.map(dv => {
        let daDong = 0;
        if (dv.doanPhi && dv.doanPhi[fieldNameHocKyDP] !== undefined) {
          daDong = dv.doanPhi[fieldNameHocKyDP] as number;
        }
        return {
          maDV: dv.maDV,
          hoTenDV: `${dv.hoDV} ${dv.tenDV}`,
          thongTinThongKe: daDong === 1 ? "Đã đóng" : "Chưa đóng",
        };
      })
      .filter(item => {
        if (trangThaiDoanPhi === 'DA_DONG') return item.thongTinThongKe === "Đã đóng";
        if (trangThaiDoanPhi === 'CHUA_DONG') return item.thongTinThongKe === "Chưa đóng";
        return true; // ALL
      });

    } else if (type.toUpperCase() === 'REN_LUYEN') {
        const xepLoaiRenLuyen = searchParams.get('xepLoaiRenLuyen')?.toUpperCase() || 'ALL';
  
        resultData = doanViens.map(dv => {
          // SỬA Ở ĐÂY: Khai báo kiểu cho diemRL là number | null
          let diemRL: number | null = null;
          let xepLoaiRL: string = "Chưa có"; // Kiểu string là ổn
  
          if (dv.renLuyens && dv.renLuyens.length > 0) {
          
            diemRL = dv.renLuyens[0].diem; 
            xepLoaiRL = dv.renLuyens[0].xepLoai;
          }
          return {
            maDV: dv.maDV,
            hoTenDV: `${dv.hoDV} ${dv.tenDV}`,
            thongTinThongKe: `${xepLoaiRL} (${diemRL !== null ? diemRL : 'N/A'} điểm)`,
            _xepLoaiRaw: xepLoaiRL, // Trường ẩn để filter
          };
        })
        .filter(item => {
          if (xepLoaiRenLuyen === 'ALL' || !xepLoaiRenLuyen) return true;
          return item._xepLoaiRaw.toUpperCase().replace(/\s+/g, '') === xepLoaiRenLuyen.replace(/\s+/g, '');
        })
        .map(({ _xepLoaiRaw, ...rest}) => rest);
  
      } else {
        return NextResponse.json({ message: 'Loại thống kê không được hỗ trợ.' }, { status: 400 });
      }
  

    // Gán STT sau khi lọc
    const finalResult = resultData.map((item, index) => ({
      stt: index + 1,
      ...item,
    }));

    return NextResponse.json(finalResult);

  } catch (error: any) {
    console.error(`GET /api/thongke (type: ${type}) error:`, error);
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi thực hiện thống kê.', error: error.message },
      { status: 500 }
    );
  }
}