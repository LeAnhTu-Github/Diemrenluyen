import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
// Ví dụ: import prisma from '@/lib/prismadb';
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn

// GET - Lấy tất cả Chi Đoàn
export async function GET(req: Request) {
  try {
    const chiDoans = await prisma.chiDoan.findMany({
      include: {
        doanCS: true, // Lấy thông tin Đoàn Cơ Sở liên quan
        _count: { // Đếm số lượng đoàn viên trong mỗi chi đoàn
          select: { doanViens: true }
        }
      },
      orderBy: {
        tenCD: 'asc', // Sắp xếp theo tên Chi Đoàn (trường trong model là tenCD, map từ TENCD)
      },
    });
    return NextResponse.json(chiDoans);
  } catch (error) {
    console.error('GET /api/chidoans error:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách Chi Đoàn', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST - Thêm mới Chi Đoàn
export async function POST(req: Request) {
  let requestData: any;
  try {
    requestData = await req.json();
    const {
      maCD, // Sẽ được map tới "MACD" trong DB
      tenCD, // Sẽ được map tới "TENCD" trong DB
      maDCS, // Mã Đoàn Cơ Sở để kết nối (trường "MADCS" trong DB của DoanCS)
    } = requestData;

    // 1. Validation cơ bản
    if (!maCD || !tenCD || !maDCS) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc. Vui lòng cung cấp đủ: maCD, tenCD, maDCS.' }, { status: 400 });
    }

    // 2. Kiểm tra sự tồn tại của Đoàn Cơ Sở (DoanCS)
    //    Trường unique trong DoanCS là maDCS (map từ "MADCS")
    const doanCSExists = await prisma.doanCS.findUnique({
      where: { maDCS: maDCS as string },
    });

    if (!doanCSExists) {
      return NextResponse.json({ message: `Đoàn Cơ Sở với mã '${maDCS}' không tồn tại. Không thể tạo Chi Đoàn.` }, { status: 400 });
    }

    // 3. Tạo Chi Đoàn
    const newChiDoan = await prisma.chiDoan.create({
      data: {
        maCD,  // Prisma model field
        tenCD, // Prisma model field
        // maDCS được dùng để connect, không phải là một trường dữ liệu trực tiếp của ChiDoan trong data payload này
        doanCS: { // Kết nối với Đoàn Cơ Sở thông qua trường @unique maDCS của DoanCS
          connect: { maDCS: maDCS as string },
        },
      },
      include: { // Trả về thông tin Đoàn Cơ Sở đã liên kết
        doanCS: true,
      }
    });

    return NextResponse.json(newChiDoan, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/chidoans error:', error);
    // Kiểm tra lỗi unique constraint cho maCD (MACD_unique là tên constraint trong DB)
    if (error.code === 'P2002' && error.meta?.target?.includes('MACD_unique')) {
      const attemptedMaCD = requestData?.maCD || "không xác định";
      return NextResponse.json({ message: `Chi Đoàn với mã '${attemptedMaCD}' đã tồn tại.` }, { status: 409 });
    }
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi liên quan (ví dụ DoanCS)
        return NextResponse.json({ message: `Lỗi khi tạo Chi Đoàn: ${error.meta?.cause || 'Không tìm thấy Đoàn Cơ Sở để liên kết.'}` }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi thêm Chi Đoàn', error: error.message },
      { status: 500 }
    );
  }
}