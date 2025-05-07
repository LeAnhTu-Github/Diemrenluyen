import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
// Ví dụ: import prisma from '@/lib/prismadb';
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn

interface Params {
  maDCS: string; // maDCS này là giá trị của trường maDCS trong model DoanCS (map từ "MADCS")
}

// GET - Lấy chi tiết một Đoàn Cơ Sở
export async function GET(req: Request, { params }: { params: Params }) {
  const { maDCS } = params;
  try {
    const doanCS = await prisma.doanCS.findUnique({
      where: { maDCS }, // Tìm bằng maDCS của model DoanCS
      include: {
        chiDoans: {     // Lấy danh sách Chi Đoàn thuộc Đoàn Cơ Sở này
          orderBy: {
            tenCD: 'asc'
          },
          include: { // Nếu muốn đếm số lượng đoàn viên trong mỗi chi đoàn con
            _count: {
              select: { doanViens: true }
            }
          }
        },
      },
    });

    if (!doanCS) {
      return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tìm thấy.` }, { status: 404 });
    }
    return NextResponse.json(doanCS);
  } catch (error) {
    console.error(`GET /api/doancss/${maDCS} error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy thông tin Đoàn Cơ Sở '${maDCS}'`, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật thông tin Đoàn Cơ Sở
export async function PUT(req: Request, { params }: { params: Params }) {
  const { maDCS: maDCSFromParams } = params; // maDCS từ URL
  let requestData: any;

  try {
    requestData = await req.json();
    const {
      tenDCS, // Tên Đoàn Cơ Sở mới (map tới "TENDCS")
      // maDCS trong body không nên cho phép thay đổi vì nó là unique key, thường không đổi
    } = requestData;

    // Dữ liệu để cập nhật
    const updateData: any = {};
    if (tenDCS !== undefined) updateData.tenDCS = tenDCS; // Cập nhật trường tenDCS của model

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'Không có dữ liệu nào được cung cấp để cập nhật.' }, { status: 400 });
    }

    const updatedDoanCS = await prisma.doanCS.update({
      where: { maDCS: maDCSFromParams }, // Tìm DoanCS bằng maDCS (map từ "MADCS")
      data: updateData,
    });

    return NextResponse.json(updatedDoanCS);
  } catch (error: any) {
    console.error(`PUT /api/doancss/${maDCSFromParams} error:`, error);
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi để cập nhật
      // P2025 message của Prisma "An operation failed because it depends on one or more records that were required but not found. {cause}"
      const cause = error.meta?.cause as string || "";
      if (cause.toLowerCase().includes("record to update not found")) {
         return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCSFromParams}' không tìm thấy.` }, { status: 404 });
      }
       return NextResponse.json({ message: `Lỗi khi cập nhật Đoàn Cơ Sở '${maDCSFromParams}': ${cause || 'Không tìm thấy bản ghi cần thiết.'}` }, { status: 400 });
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi cập nhật Đoàn Cơ Sở '${maDCSFromParams}'`, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Xoá Đoàn Cơ Sở
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { maDCS } = params; // maDCS từ URL
  try {
    // 1. Kiểm tra sự tồn tại của Đoàn Cơ Sở
    const doanCSExists = await prisma.doanCS.findUnique({ where: {maDCS}});
    if (!doanCSExists) {
        return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tìm thấy để xóa.` }, { status: 404 });
    }

    // 2. Kiểm tra xem Đoàn Cơ Sở có Chi Đoàn nào không trước khi xóa
    //    Trường liên kết trong ChiDoan là maDCS (map từ "MADCS")
    const chiDoansInDoanCS = await prisma.chiDoan.count({
      where: { maDCS: maDCS },
    });

    if (chiDoansInDoanCS > 0) {
      return NextResponse.json(
        { message: `Không thể xóa Đoàn Cơ Sở '${maDCS}' vì vẫn còn ${chiDoansInDoanCS} Chi Đoàn thuộc Đoàn Cơ Sở này. Vui lòng chuyển hoặc xóa các Chi Đoàn trước.` },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. Nếu không có Chi Đoàn, tiến hành xóa Đoàn Cơ Sở
    const deletedDoanCS = await prisma.doanCS.delete({
      where: { maDCS }, // Xóa DoanCS bằng maDCS (map từ "MADCS")
    });

    return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' đã được xóa thành công.`, deletedData: deletedDoanCS });
  } catch (error: any) {
    console.error(`DELETE /api/doancss/${maDCS} error:`, error);
    if (error.code === 'P2025') { // Record to delete not found (dù đã check, nhưng vẫn có thể do race condition)
        return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tìm thấy.` }, { status: 404 });
    }
    // Lỗi P2003 có thể xảy ra nếu có ràng buộc khác không được xử lý
    if (error.code === 'P2003') {
        return NextResponse.json(
            { message: `Không thể xóa Đoàn Cơ Sở '${maDCS}' do có ràng buộc khóa ngoại. Lỗi: ${error.meta?.field_name || 'Không xác định'}.` },
            { status: 409 }
        );
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi xoá Đoàn Cơ Sở '${maDCS}'`, error: error.message },
      { status: 500 }
    );
  }
}