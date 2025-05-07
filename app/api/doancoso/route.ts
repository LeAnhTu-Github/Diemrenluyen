import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
// Ví dụ: import prisma from '@/lib/prismadb';
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn

// GET - Lấy tất cả Đoàn Cơ Sở
export async function GET(req: Request) {
  try {
    const doanCSs = await prisma.doanCS.findMany({
      include: {
        // chiDoans: true, // Bỏ comment nếu muốn lấy danh sách chi đoàn của mỗi Đoàn CS
        _count: { // Đếm số lượng Chi Đoàn trong mỗi Đoàn Cơ Sở
          select: { chiDoans: true }
        }
      },
      orderBy: {
        tenDCS: 'asc', // Sắp xếp theo tên Đoàn Cơ Sở (trường trong model là tenDCS, map từ TENDCS)
      },
    });
    return NextResponse.json(doanCSs);
  } catch (error) {
    console.error('GET /api/doancss error:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách Đoàn Cơ Sở', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST - Thêm mới Đoàn Cơ Sở
export async function POST(req: Request) {
  let requestData: any;
  try {
    requestData = await req.json();
    const {
      maDCS, // Sẽ được map tới "MADCS" trong DB
      tenDCS, // Sẽ được map tới "TENDCS" trong DB
    } = requestData;

    // 1. Validation cơ bản
    if (!maDCS || !tenDCS) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc. Vui lòng cung cấp đủ: maDCS, tenDCS.' }, { status: 400 });
    }

    // 2. Tạo Đoàn Cơ Sở (Không cần kiểm tra gì thêm vì không có foreign key khi tạo)
    const newDoanCS = await prisma.doanCS.create({
      data: {
        maDCS,  // Prisma model field
        tenDCS, // Prisma model field
      },
    });

    return NextResponse.json(newDoanCS, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/doancss error:', error);
    // Kiểm tra lỗi unique constraint cho maDCS (MADCS_unique là tên constraint trong DB)
    if (error.code === 'P2002' && error.meta?.target?.includes('MADCS_unique')) {
      const attemptedMaDCS = requestData?.maDCS || "không xác định";
      return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${attemptedMaDCS}' đã tồn tại.` }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi thêm Đoàn Cơ Sở', error: error.message },
      { status: 500 }
    );
  }
}