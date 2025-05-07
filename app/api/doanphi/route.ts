import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
import prisma from "@/app/libs/prismadb";

// GET - Thống kê Đoàn phí theo Chi đoàn và Học kỳ
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const maCD = searchParams.get('maCD');
  const hocKyStr = searchParams.get('hocKy');
  const trangThai = searchParams.get('trangThai') || 'ALL'; // Mặc định là 'ALL'

  // 1. Validate đầu vào
  if (!maCD) {
    return NextResponse.json({ message: 'Thiếu tham số maCD (Mã Chi Đoàn).' }, { status: 400 });
  }
  if (!hocKyStr) {
    return NextResponse.json({ message: 'Thiếu tham số hocKy (Học Kỳ).' }, { status: 400 });
  }

  const parsedHocKy = parseInt(hocKyStr, 10);
  if (isNaN(parsedHocKy) || parsedHocKy < 1 || parsedHocKy > 8) {
    return NextResponse.json({ message: 'Học kỳ không hợp lệ. Phải là số từ 1 đến 8.' }, { status: 400 });
  }

  const validTrangThai = ['ALL', 'DA_DONG', 'CHUA_DONG'];
  if (!validTrangThai.includes(trangThai.toUpperCase())) {
      return NextResponse.json({ message: 'Trạng thái không hợp lệ. Chỉ chấp nhận: ALL, DA_DONG, CHUA_DONG.' }, { status: 400 });
  }

  try {
    // 2. Kiểm tra sự tồn tại của Chi Đoàn
    const chiDoanExists = await prisma.chiDoan.findUnique({
      where: { maCD },
    });
    if (!chiDoanExists) {
      return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy.` }, { status: 404 });
    }

    // 3. Lấy danh sách Đoàn viên của Chi Đoàn đó, kèm thông tin Đoàn phí
    let doanViens = await prisma.doanVien.findMany({
      where: {
        maCD: maCD,
      },
      include: {
        doanPhi: true, // Lấy thông tin đoàn phí liên quan
      },
      orderBy: [ // Sắp xếp theo nhiều tiêu chí nếu cần
        { hoDV: 'asc' },
        { tenDV: 'asc' },
      ],
    });

    // 4. Xử lý và lọc dữ liệu theo trạng thái đóng phí cho học kỳ được chọn
    const fieldNameHocKy = `hk${parsedHocKy}` as keyof typeof prisma.doanPhi.fields; // hk1, hk2, ...

    const result = doanViens.map(dv => {
      let daDongPhiChoHocKy = 0; // Mặc định là chưa đóng

      if (dv.doanPhi && dv.doanPhi[fieldNameHocKy] !== undefined) {
        daDongPhiChoHocKy = dv.doanPhi[fieldNameHocKy] as number; // Giá trị là 0 hoặc 1
      }

      return {
        stt: 0, // STT sẽ được gán ở client hoặc sau khi lọc
        maDV: dv.maDV,
        hoTenDV: `${dv.hoDV} ${dv.tenDV}`,
        trangThaiDoanPhiHocKy: daDongPhiChoHocKy === 1 ? "Đã đóng" : "Chưa đóng",
        // Thêm các trường khác của DoanVien nếu cần cho hiển thị
      };
    })
    .filter(dvInfo => {
        if (trangThai.toUpperCase() === 'DA_DONG') {
            return dvInfo.trangThaiDoanPhiHocKy === "Đã đóng";
        }
        if (trangThai.toUpperCase() === 'CHUA_DONG') {
            return dvInfo.trangThaiDoanPhiHocKy === "Chưa đóng";
        }
        return true; // ALL hoặc trạng thái không hợp lệ (đã check ở trên)
    })
    .map((dvInfo, index) => ({ ...dvInfo, stt: index + 1 })); // Gán STT sau khi lọc

    return NextResponse.json(result);

  } catch (error: any) {
    console.error(`GET /api/thongke/doanphi error:`, error);
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi thực hiện thống kê Đoàn phí.', error: error.message },
      { status: 500 }
    );
  }
}