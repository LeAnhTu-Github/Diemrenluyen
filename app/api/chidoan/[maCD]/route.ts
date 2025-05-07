// File: app/api/chidoans/[maCD]/route.ts

import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb"; // Đảm bảo đường dẫn và file này đúng
interface Params {
  maCD: string;
}

// ... (Hàm GET giữ nguyên)

// PUT - Cập nhật thông tin Chi Đoàn
export async function PUT(req: Request, { params }: { params: Params }) {
  const { maCD: maCDFromParams } = params;
  let requestData: any;

  try {
    requestData = await req.json();
    const {
      tenCD,
      maDCS, // Mã Đoàn Cơ Sở mới
    } = requestData;

    const existingChiDoan = await prisma.chiDoan.findUnique({
        where: { maCD: maCDFromParams }
    });
    if (!existingChiDoan) {
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCDFromParams}' không tìm thấy để cập nhật.` }, { status: 404 });
    }

    const updateData: any = {};

    if (tenCD !== undefined) {
      if (typeof tenCD !== 'string' || tenCD.trim() === '') {
        return NextResponse.json({ message: 'Tên Chi Đoàn (tenCD) không được để trống.' }, { status: 400 });
      }
      updateData.tenCD = tenCD.trim();
    }

    if (maDCS !== undefined) {
      if (typeof maDCS !== 'string' || maDCS.trim() === '') {
        return NextResponse.json({ message: 'Mã Đoàn Cơ Sở (maDCS) không được để trống nếu muốn thay đổi.' }, { status: 400 });
      }
      const newMaDCSTrimmed = maDCS.trim();

      const doanCSExists = await prisma.doanCS.findUnique({
        where: { maDCS: newMaDCSTrimmed },
      });
      if (!doanCSExists) {
        return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${newMaDCSTrimmed}' không tồn tại. Không thể cập nhật liên kết.` }, { status: 400 });
      }
      // Ưu tiên cập nhật trực tiếp trường khóa ngoại
      updateData.maDCS = newMaDCSTrimmed;
    }

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'Không có dữ liệu nào được cung cấp để cập nhật.' }, { status: 400 });
    }

    console.log(`[PUT /api/chidoans/${maCDFromParams}] Updating with data:`, updateData);
    const updatedChiDoan = await prisma.chiDoan.update({
      where: { maCD: maCDFromParams },
      data: updateData,
      include: {
          doanCS: true
      }
    });

    console.log(`[PUT /api/chidoans/${maCDFromParams}] Update successful:`, updatedChiDoan);
    return NextResponse.json(updatedChiDoan);

  } catch (error: any) {
    console.error(`[PUT /api/chidoans/${maCDFromParams}] Error:`, error);
    if (error.code === 'P2025') {
      // ... (xử lý lỗi P2025 như cũ) ...
      const cause = error.meta?.cause as string || "";
      if (cause.toLowerCase().includes("record to update not found") || error.message.toLowerCase().includes("record to update not found")) {
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCDFromParams}' không tìm thấy.` }, { status: 404 });
      }
      return NextResponse.json({ message: `Lỗi khi cập nhật Chi Đoàn '${maCDFromParams}': ${cause || 'Không tìm thấy bản ghi liên quan cần thiết.'}` }, { status: 400 });
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi cập nhật Chi Đoàn '${maCDFromParams}'`, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Xoá Chi Đoàn (GIỮ NGUYÊN TỪ CODE CỦA BẠN)
export async function DELETE(req: Request, { params }: { params: Params }) {
  const { maCD } = params;
  try {
    console.log(`[DELETE /api/chidoans/${maCD}] Request received for maCD: ${maCD}`);
    const chiDoanExists = await prisma.chiDoan.findUnique({ where: {maCD}});
    if (!chiDoanExists) {
        console.log(`[DELETE /api/chidoans/${maCD}] ChiDoan not found.`);
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy để xóa.` }, { status: 404 });
    }

    const doanViensInChiDoan = await prisma.doanVien.count({
      where: { maCD: maCD }, // Điều kiện này đúng vì DoanVien có trường maCD
    });

    if (doanViensInChiDoan > 0) {
      console.log(`[DELETE /api/chidoans/${maCD}] Cannot delete. ChiDoan has ${doanViensInChiDoan} DoanViens.`);
      return NextResponse.json(
        { message: `Không thể xóa Chi Đoàn '${maCD}' vì vẫn còn ${doanViensInChiDoan} Đoàn viên thuộc Chi Đoàn này. Vui lòng chuyển hoặc xóa các Đoàn viên trước.` },
        { status: 409 }
      );
    }

    const deletedChiDoan = await prisma.chiDoan.delete({
      where: { maCD },
    });

    console.log(`[DELETE /api/chidoans/${maCD}] Delete successful:`, deletedChiDoan);
    return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' đã được xóa thành công.`, deletedData: deletedChiDoan });
  } catch (error: any) {
    console.error(`DELETE /api/chidoans/${maCD} error:`, error);
    if (error.code === 'P2025') {
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy để xóa (P2025).` }, { status: 404 });
    }
    if (error.code === 'P2003') {
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