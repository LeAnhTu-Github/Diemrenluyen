import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb";

interface Params {
  maCD: string;
}

// GET - Lấy chi tiết một Chi Đoàn
export async function GET(req: Request, { params }: { params: Params }) { // Params là { maCD: string }
  const { maCD } = params;
  try {
    const chiDoan = await prisma.chiDoan.findUnique({
      where: { maCD },
      include: {
        doanCS: true,
        doanViens: { // Lấy danh sách đoàn viên thuộc chi đoàn này
          orderBy: {
            // Sắp xếp đoàn viên, ví dụ theo tên
            // hoDV: 'asc',
            tenDV: 'asc'
          },
          include: {
            doanPhi: true // QUAN TRỌNG: Bao gồm thông tin Đoàn Phí
          }
        },
      },
    });

    if (!chiDoan) {
      return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy.` }, { status: 404 });
    }

    // Xử lý trường hợp đoàn viên chưa có bản ghi DoanPhi
    // (Nếu muốn client luôn nhận được object doanPhi với các trường hk)
    const chiDoanWithDefaultDoanPhi = {
        ...chiDoan,
        doanViens: chiDoan.doanViens.map(dv => ({
            ...dv,
            doanPhi: dv.doanPhi || { maDV: dv.maDV, hk1: 0, hk2: 0, hk3: 0, hk4: 0, hk5: 0, hk6: 0, hk7: 0, hk8: 0 }
        }))
    };


    return NextResponse.json(chiDoanWithDefaultDoanPhi);
    // Hoặc chỉ return NextResponse.json(chiDoan); nếu client tự xử lý việc DoanPhi có thể là null
  } catch (error) {
    console.error(`GET /api/chidoans/${maCD} error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy thông tin Chi Đoàn '${maCD}'`, error: (error as Error).message },
      { status: 500 }
    );
  }
}


// DELETE - Xoá Chi Đoàn
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { maCD } = params; // maCD từ URL
  try {
    // 1. Kiểm tra sự tồn tại của Chi Đoàn
    const chiDoanExists = await prisma.chiDoan.findUnique({ where: {maCD}});
    if (!chiDoanExists) {
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy để xóa.` }, { status: 404 });
    }

    // 2. Kiểm tra xem Chi Đoàn có Đoàn viên nào không trước khi xóa
    //    Trường liên kết trong DoanVien là maCD (map từ "MACD")
    const doanViensInChiDoan = await prisma.doanVien.count({
      where: { maCD: maCD },
    });

    if (doanViensInChiDoan > 0) {
      return NextResponse.json(
        { message: `Không thể xóa Chi Đoàn '${maCD}' vì vẫn còn ${doanViensInChiDoan} Đoàn viên thuộc Chi Đoàn này. Vui lòng chuyển hoặc xóa các Đoàn viên trước.` },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. Nếu không có đoàn viên, tiến hành xóa Chi Đoàn
    const deletedChiDoan = await prisma.chiDoan.delete({
      where: { maCD }, // Xóa ChiDoan bằng maCD (map từ "MACD")
    });

    return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' đã được xóa thành công.`, deletedData: deletedChiDoan });
  } catch (error: any) {
    console.error(`DELETE /api/chidoans/${maCD} error:`, error);
    if (error.code === 'P2025') { // Record to delete not found (dù đã check, nhưng vẫn có thể do race condition)
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy.` }, { status: 404 });
    }
    if (error.code === 'P2003') { // Lỗi ràng buộc khóa ngoại
        return NextResponse.json(
            { message: `Không thể xóa Chi Đoàn '${maCD}' do có ràng buộc khóa ngoại. Lỗi: ${error.meta?.field_name || 'Không xác định'}.` },
            { status: 409 }
        );
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi xoá Chi Đoàn '${maCD}'`, error: error.message },
      { status: 500 }
    );
  }
}