// File: app/api/chidoans/[maCD]/route.ts

import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb"; // Đảm bảo đường dẫn và file này đúng

interface Params {
  maCD: string;
}

// GET - Lấy chi tiết một Chi Đoàn
export async function GET(req: Request, { params }: { params: Params }) {
  const { maCD } = params; // maCD lấy từ URL, ví dụ: /api/chidoans/CDKT01

  try {
    // Log để kiểm tra maCD nhận được
    console.log(`[GET /api/chidoans/${maCD}] Request received for maCD: ${maCD}`);

    const chiDoan = await prisma.chiDoan.findUnique({
      where: { maCD: maCD }, // Tìm Chi Đoàn dựa trên trường maCD (unique) của model ChiDoan
      include: {
        doanCS: true,       // Lấy thông tin Đoàn Cơ Sở mà Chi Đoàn này thuộc về
        doanViens: {        // Lấy danh sách các Đoàn Viên thuộc Chi Đoàn này
          orderBy: {
            // Sắp xếp đoàn viên, ví dụ theo tên
            // hoDV: 'asc', // Cần kiểm tra cú pháp sắp xếp nhiều trường trên MongoDB với Prisma
            tenDV: 'asc'
          },
          include: {
            doanPhi: true // QUAN TRỌNG: Lấy thông tin Đoàn Phí của mỗi Đoàn Viên
          }
        },
      },
    });

    // Log kết quả query từ Prisma
    console.log(`[GET /api/chidoans/${maCD}] Prisma query result:`, JSON.stringify(chiDoan, null, 2));

    if (!chiDoan) {
      console.log(`[GET /api/chidoans/${maCD}] ChiDoan not found in database.`);
      return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy.` }, { status: 404 });
    }


    const chiDoanWithDefaultDoanPhi = {
        ...chiDoan,
        doanViens: chiDoan.doanViens.map(dv => ({
            ...dv,
            doanPhi: dv.doanPhi || {
                // Cung cấp các trường cần thiết cho object DoanPhi mặc định
                // id: null, // hoặc để trống nếu không cần thiết khi hiển thị
                maDV: dv.maDV, // Quan trọng để biết của đoàn viên nào
                hk1: 0, hk2: 0, hk3: 0, hk4: 0,
                hk5: 0, hk6: 0, hk7: 0, hk8: 0,
              
            }
        }))
    };

    console.log(`[GET /api/chidoans/${maCD}] Response data:`, JSON.stringify(chiDoanWithDefaultDoanPhi, null, 2));
    return NextResponse.json(chiDoanWithDefaultDoanPhi);

  } catch (error: any) {
    console.error(`[GET /api/chidoans/${maCD}] Error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy thông tin Chi Đoàn '${maCD}'`, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { maCD } = params;
 
  try {
    // 1. Kiểm tra sự tồn tại của Chi Đoàn
    const chiDoanExists = await prisma.chiDoan.findUnique({ where: {maCD}});
    if (!chiDoanExists) {
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy để xóa.` }, { status: 404 });
    }

    // 2. Kiểm tra xem Chi Đoàn có Đoàn viên nào không trước khi xóa
    const doanViensInChiDoan = await prisma.doanVien.count({
      where: { maCD: maCD }, // Điều kiện này đúng vì DoanVien có trường maCD
    });

    if (doanViensInChiDoan > 0) {
      return NextResponse.json(
        { message: `Không thể xóa Chi Đoàn '${maCD}' vì vẫn còn ${doanViensInChiDoan} Đoàn viên thuộc Chi Đoàn này. Vui lòng chuyển hoặc xóa các Đoàn viên trước.` },
        { status: 409 }
      );
    }

    // 3. Nếu không có đoàn viên, tiến hành xóa Chi Đoàn
    const deletedChiDoan = await prisma.chiDoan.delete({
      where: { maCD },
    });

    return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' đã được xóa thành công.`, deletedData: deletedChiDoan });
  } catch (error: any) {
    console.error(`DELETE /api/chidoans/${maCD} error:`, error);
    if (error.code === 'P2025') {
        return NextResponse.json({ message: `Chi Đoàn với mã '${maCD}' không tìm thấy để xóa.` }, { status: 404 });
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
