import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn

interface RenLuyenParams {
  maDV: string; // Mã Đoàn viên từ URL
}

// GET - Lấy tất cả điểm rèn luyện của một Đoàn viên
export async function GET(req: Request, { params }: { params: RenLuyenParams }) {
  const { maDV } = params;

  try {
    // Kiểm tra DoanVien có tồn tại không
    const doanVienExists = await prisma.doanVien.findUnique({ where: { maDV } });
    if (!doanVienExists) {
      return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' không tìm thấy.` }, { status: 404 });
    }

    const renLuyens = await prisma.renLuyen.findMany({
      where: { maDV: maDV },
      orderBy: {
        hocKy: 'asc', // Sắp xếp theo học kỳ
      },
      // include: { doanVien: true } // Không cần thiết vì đã biết maDV
    });
    return NextResponse.json(renLuyens);
  } catch (error) {
    console.error(`GET /api/doanviens/${maDV}/renluyens error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy danh sách rèn luyện của đoàn viên '${maDV}'`, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST - Thêm mới điểm rèn luyện cho một Đoàn viên
export async function POST(req: Request, { params }: { params: RenLuyenParams }) {
  const { maDV } = params;
  let requestData: any;

  try {
    requestData = await req.json();
    const {
      hocKy, // Số nguyên, ví dụ 1, 2, 3,...
      diem,  // Số nguyên
      xepLoai // String, ví dụ: "Xuất sắc", "Tốt", "Khá"...
    } = requestData;

    // 1. Validation cơ bản
    if (hocKy === undefined || diem === undefined || !xepLoai) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc. Vui lòng cung cấp đủ: hocKy, diem, xepLoai.' }, { status: 400 });
    }
    const parsedHocKy = parseInt(hocKy as string, 10);
    const parsedDiem = parseInt(diem as string, 10);
    if (isNaN(parsedHocKy) || isNaN(parsedDiem)) {
        return NextResponse.json({ message: 'Học kỳ và điểm phải là số nguyên.' }, { status: 400 });
    }


    // 2. Kiểm tra sự tồn tại của Đoàn Viên
    const doanVienExists = await prisma.doanVien.findUnique({
      where: { maDV: maDV },
    });
    if (!doanVienExists) {
      return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' không tồn tại. Không thể thêm điểm rèn luyện.` }, { status: 404 });
    }

    // 3. Tạo điểm Rèn Luyện
    //    Prisma sẽ tự động kiểm tra unique constraint (maDV, hocKy)
    const newRenLuyen = await prisma.renLuyen.create({
      data: {
        hocKy: parsedHocKy, // map tới "HOCKY"
        diem: parsedDiem,   // map tới "DIEM"
        xepLoai,        // map tới "XEPLOAI"
        doanVien: {      // Kết nối với Đoàn Viên
          connect: { maDV: maDV },
        },
      },
    });

    return NextResponse.json(newRenLuyen, { status: 201 });
  } catch (error: any) {
    console.error(`POST /api/doanviens/${maDV}/renluyens error:`, error);
    // Kiểm tra lỗi unique constraint cho (maDV, hocKy)
    // Tên constraint có thể là RenLuyen_maDV_hocKy_key hoặc tương tự, kiểm tra trong DB hoặc lỗi Prisma
    if (error.code === 'P2002' && error.meta?.target?.includes('maDV') && error.meta?.target?.includes('hocKy')) {
      const attemptedHocKy = requestData?.hocKy || "không xác định";
      return NextResponse.json({ message: `Điểm rèn luyện cho đoàn viên '${maDV}' học kỳ '${attemptedHocKy}' đã tồn tại.` }, { status: 409 });
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi thêm điểm rèn luyện cho đoàn viên '${maDV}'`, error: error.message },
      { status: 500 }
    );
  }
}