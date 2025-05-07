import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn

interface RenLuyenDetailParams {
  maDV: string;
  hocKy: string; // hocKy từ URL sẽ là string, cần parse
}

// GET - Lấy chi tiết một điểm rèn luyện của Đoàn viên theo học kỳ
export async function GET(req: Request, { params }: { params: RenLuyenDetailParams }) {
  const { maDV, hocKy: hocKyStr } = params;
  const parsedHocKy = parseInt(hocKyStr, 10);

  if (isNaN(parsedHocKy)) {
    return NextResponse.json({ message: `Học kỳ '${hocKyStr}' không hợp lệ.` }, { status: 400 });
  }

  try {
    const renLuyen = await prisma.renLuyen.findUnique({
      where: {
        maDV_hocKy: { // Sử dụng compound unique key
          maDV: maDV,
          hocKy: parsedHocKy,
        }
      },
      // include: { doanVien: true } // Có thể include nếu cần thông tin chi tiết đoàn viên
    });

    if (!renLuyen) {
      return NextResponse.json({ message: `Không tìm thấy điểm rèn luyện cho đoàn viên '${maDV}' học kỳ '${parsedHocKy}'.` }, { status: 404 });
    }
    return NextResponse.json(renLuyen);
  } catch (error) {
    console.error(`GET /api/doanviens/${maDV}/renluyens/${hocKyStr} error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy thông tin rèn luyện`, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật điểm rèn luyện của Đoàn viên theo học kỳ
export async function PUT(req: Request, { params }: { params: RenLuyenDetailParams }) {
  const { maDV, hocKy: hocKyStr } = params;
  const parsedHocKy = parseInt(hocKyStr, 10);
  let requestData: any;

  if (isNaN(parsedHocKy)) {
    return NextResponse.json({ message: `Học kỳ '${hocKyStr}' không hợp lệ.` }, { status: 400 });
  }

  try {
    requestData = await req.json();
    const {
      diem,
      xepLoai
    } = requestData;

    // Dữ liệu để cập nhật
    const updateData: any = {};
    if (diem !== undefined) {
        const parsedDiem = parseInt(diem as string, 10);
        if (isNaN(parsedDiem)) {
            return NextResponse.json({ message: 'Điểm phải là số nguyên.' }, { status: 400 });
        }
        updateData.diem = parsedDiem;
    }
    if (xepLoai !== undefined) updateData.xepLoai = xepLoai;

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'Không có dữ liệu nào được cung cấp để cập nhật.' }, { status: 400 });
    }

    const updatedRenLuyen = await prisma.renLuyen.update({
      where: {
        maDV_hocKy: {
          maDV: maDV,
          hocKy: parsedHocKy,
        }
      },
      data: updateData,
    });

    return NextResponse.json(updatedRenLuyen);
  } catch (error: any) {
    console.error(`PUT /api/doanviens/${maDV}/renluyens/${hocKyStr} error:`, error);
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi để cập nhật
      return NextResponse.json({ message: `Không tìm thấy điểm rèn luyện cho đoàn viên '${maDV}' học kỳ '${parsedHocKy}' để cập nhật.` }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi cập nhật điểm rèn luyện`, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Xoá điểm rèn luyện của Đoàn viên theo học kỳ
export async function DELETE(req: Request, { params }: { params: RenLuyenDetailParams }) {
  const { maDV, hocKy: hocKyStr } = params;
  const parsedHocKy = parseInt(hocKyStr, 10);

  if (isNaN(parsedHocKy)) {
    return NextResponse.json({ message: `Học kỳ '${hocKyStr}' không hợp lệ.` }, { status: 400 });
  }

  try {
    // Kiểm tra sự tồn tại trước khi xóa (tùy chọn, delete sẽ báo lỗi P2025 nếu không tìm thấy)
    const renLuyenExists = await prisma.renLuyen.findUnique({
        where: { maDV_hocKy: { maDV, hocKy: parsedHocKy } }
    });
    if (!renLuyenExists) {
        return NextResponse.json({ message: `Không tìm thấy điểm rèn luyện cho đoàn viên '${maDV}' học kỳ '${parsedHocKy}' để xóa.` }, { status: 404 });
    }

    await prisma.renLuyen.delete({
      where: {
        maDV_hocKy: {
          maDV: maDV,
          hocKy: parsedHocKy,
        }
      },
    });

    return NextResponse.json({ message: `Điểm rèn luyện của đoàn viên '${maDV}' học kỳ '${parsedHocKy}' đã được xóa thành công.` });
    // Hoặc: return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error(`DELETE /api/doanviens/${maDV}/renluyens/${hocKyStr} error:`, error);
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi để xóa
      return NextResponse.json({ message: `Không tìm thấy điểm rèn luyện cho đoàn viên '${maDV}' học kỳ '${parsedHocKy}' để xóa.` }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi xoá điểm rèn luyện`, error: error.message },
      { status: 500 }
    );
  }
}