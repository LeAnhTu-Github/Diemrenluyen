// File: app/api/doancss/[maDCS]/route.ts

import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb"; // Đảm bảo đường dẫn và file này đúng

interface Params {
  maDCS: string;
}

// GET - Lấy chi tiết một Đoàn Cơ Sở
export async function GET(req: Request, { params }: { params: Params }) {
  const { maDCS } = params; // maDCS lấy từ URL, ví dụ: /api/doancss/DCS_KHOA_CNTT
  try {
    // Log để kiểm tra maDCS nhận được
    console.log(`[GET /api/doancss/${maDCS}] Request received for maDCS: ${maDCS}`);

    const doanCS = await prisma.doanCS.findUnique({
      where: { maDCS: maDCS }, // Tìm Đoàn Cơ Sở dựa trên trường maDCS (unique) của model DoanCS
      include: {
        chiDoans: {     // Lấy danh sách các Chi Đoàn thuộc Đoàn Cơ Sở này
          orderBy: {
            tenCD: 'asc' // Sắp xếp các Chi Đoàn theo tên
          },
          include: { // Lấy thêm thông tin lồng sâu hơn cho mỗi Chi Đoàn
            // Ví dụ: đếm số đoàn viên của mỗi Chi Đoàn
            _count: {
              select: { doanViens: true }
            },
            // Bạn cũng có thể include thông tin đoàn viên nếu cần:
            // doanViens: {
            //   orderBy: { tenDV: 'asc' },
            //   include: { doanPhi: true } // Ví dụ
            // }
          }
        },
      },
    });

    // Log kết quả query từ Prisma
    console.log(`[GET /api/doancss/${maDCS}] Prisma query result:`, JSON.stringify(doanCS, null, 2));

    if (!doanCS) {
      console.log(`[GET /api/doancss/${maDCS}] DoanCS not found in database.`);
      return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tìm thấy.` }, { status: 404 });
    }

    // Dữ liệu trả về đã bao gồm danh sách chiDoans
    console.log(`[GET /api/doancss/${maDCS}] Response data (includes chiDoans):`, JSON.stringify(doanCS, null, 2));
    return NextResponse.json(doanCS);

  } catch (error: any) {
    console.error(`[GET /api/doancss/${maDCS}] Error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy thông tin Đoàn Cơ Sở '${maDCS}'`, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật thông tin Đoàn Cơ Sở (Giữ nguyên như code bạn cung cấp)
export async function PUT(req: Request, { params }: { params: Params }) {
  // ... (code PUT của bạn) ...
  // Logic PUT của bạn đã đúng, chỉ cập nhật tenDCS.
  const { maDCS: maDCSFromParams } = params;
  let requestData: any;

  try {
    requestData = await req.json();
    const { tenDCS } = requestData;

    const updateData: any = {};
    if (tenDCS !== undefined) updateData.tenDCS = tenDCS;

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'Không có dữ liệu nào được cung cấp để cập nhật.' }, { status: 400 });
    }

    const updatedDoanCS = await prisma.doanCS.update({
      where: { maDCS: maDCSFromParams },
      data: updateData,
    });

    return NextResponse.json(updatedDoanCS);
  } catch (error: any) {
    console.error(`PUT /api/doancss/${maDCSFromParams} error:`, error);
    if (error.code === 'P2025') {
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

// DELETE - Xoá Đoàn Cơ Sở (Giữ nguyên như code bạn cung cấp)
export async function DELETE(req: Request, { params }: { params: Params }) {
  // ... (code DELETE của bạn) ...
  // Logic DELETE của bạn đã đúng, bao gồm kiểm tra ChiDoan con.
  const { maDCS } = params;
  try {
    const doanCSExists = await prisma.doanCS.findUnique({ where: {maDCS}});
    if (!doanCSExists) {
        return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tìm thấy để xóa.` }, { status: 404 });
    }

    const chiDoansInDoanCS = await prisma.chiDoan.count({
      where: { maDCS: maDCS },
    });

    if (chiDoansInDoanCS > 0) {
      return NextResponse.json(
        { message: `Không thể xóa Đoàn Cơ Sở '${maDCS}' vì vẫn còn ${chiDoansInDoanCS} Chi Đoàn thuộc Đoàn Cơ Sở này. Vui lòng chuyển hoặc xóa các Chi Đoàn trước.` },
        { status: 409 }
      );
    }

    const deletedDoanCS = await prisma.doanCS.delete({
      where: { maDCS },
    });

    return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' đã được xóa thành công.`, deletedData: deletedDoanCS });
  } catch (error: any) {
    console.error(`DELETE /api/doancss/${maDCS} error:`, error);
    if (error.code === 'P2025') {
        return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tìm thấy.` }, { status: 404 });
    }
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