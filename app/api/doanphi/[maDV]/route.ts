import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn

interface DoanPhiParams {
  maDV: string; // Mã Đoàn viên từ URL
}

// PUT - Cập nhật hoặc Tạo mới (Upsert) bản ghi Đoàn Phí cho một Đoàn viên
export async function PUT(req: Request, { params }: { params: DoanPhiParams }) {
  const { maDV } = params;
  let requestData: any;

  try {
    requestData = await req.json();
    const {
      hk1, hk2, hk3, hk4, hk5, hk6, hk7, hk8 // Các giá trị 0 hoặc 1
    } = requestData;

    // 1. Validation cơ bản cho các giá trị học kỳ
    const hks = [hk1, hk2, hk3, hk4, hk5, hk6, hk7, hk8];
    for (const hk of hks) {
      if (hk !== undefined && (typeof hk !== 'number' || (hk !== 0 && hk !== 1))) {
        return NextResponse.json({ message: 'Giá trị các học kỳ phải là 0 (chưa đóng) hoặc 1 (đã đóng).' }, { status: 400 });
      }
    }

    // 2. Kiểm tra sự tồn tại của Đoàn Viên
    const doanVienExists = await prisma.doanVien.findUnique({
      where: { maDV: maDV },
    });
    if (!doanVienExists) {
      return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' không tồn tại.` }, { status: 404 });
    }

    // 3. Dữ liệu để cập nhật hoặc tạo mới
    const dataToUpsert: any = {};
    if (hk1 !== undefined) dataToUpsert.hk1 = hk1;
    if (hk2 !== undefined) dataToUpsert.hk2 = hk2;
    if (hk3 !== undefined) dataToUpsert.hk3 = hk3;
    if (hk4 !== undefined) dataToUpsert.hk4 = hk4;
    if (hk5 !== undefined) dataToUpsert.hk5 = hk5;
    if (hk6 !== undefined) dataToUpsert.hk6 = hk6;
    if (hk7 !== undefined) dataToUpsert.hk7 = hk7;
    if (hk8 !== undefined) dataToUpsert.hk8 = hk8;

    // Nếu không có dữ liệu học kỳ nào được gửi, không làm gì cả (hoặc trả lỗi tùy ý)
    if (Object.keys(dataToUpsert).length === 0) {
        return NextResponse.json({ message: 'Không có dữ liệu học kỳ nào được cung cấp để cập nhật.' }, { status: 400 });
    }

    // Sử dụng upsert:
    // - Nếu bản ghi DoanPhi cho maDV này đã tồn tại, nó sẽ được cập nhật.
    // - Nếu chưa tồn tại, một bản ghi mới sẽ được tạo.
    const upsertedDoanPhi = await prisma.doanPhi.upsert({
      where: {
        maDV: maDV, // Điều kiện để tìm bản ghi DoanPhi (unique)
      },
      update: dataToUpsert, // Dữ liệu để cập nhật nếu tìm thấy
      create: { // Dữ liệu để tạo mới nếu không tìm thấy
        maDV: maDV, // Phải cung cấp maDV để liên kết với DoanVien
        ...dataToUpsert, // Các trường hk1-hk8 sẽ lấy từ dataToUpsert, nếu thiếu sẽ dùng default(0) từ schema
      },
      // include: { doanVien: true } // Có thể include nếu cần trả về thông tin đoàn viên
    });

    return NextResponse.json(upsertedDoanPhi);
  } catch (error: any) {
    console.error(`PUT /api/doanphi/${maDV} error:`, error);
    // P2025 có thể xảy ra nếu `connect` trong `create` thất bại (mặc dù đã check doanVienExists)
    // nhưng với upsert và create trực tiếp maDV thì ít khả năng hơn.
    if (error.code === 'P2025') {
        return NextResponse.json({ message: `Lỗi khi cập nhật Đoàn phí cho '${maDV}': ${error.meta?.cause || 'Không tìm thấy bản ghi liên quan.'}` }, { status: 400 });
    }
    return NextResponse.json(
      { message: `Lỗi máy chủ nội bộ khi cập nhật Đoàn phí cho '${maDV}'`, error: error.message },
      { status: 500 }
    );
  }
}

// GET - Lấy thông tin Đoàn Phí của một Đoàn viên (Tùy chọn, vì đã có thể lấy qua API ChiDoan)
export async function GET(req: Request, { params }: { params: DoanPhiParams }) {
  const { maDV } = params;
  try {
    // Kiểm tra DoanVien có tồn tại không
    const doanVienExists = await prisma.doanVien.findUnique({ where: { maDV } });
    if (!doanVienExists) {
      return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' không tìm thấy.` }, { status: 404 });
    }

    let doanPhi = await prisma.doanPhi.findUnique({
      where: { maDV: maDV },
    });

    // Nếu đoàn viên chưa có bản ghi đoàn phí, trả về một object rỗng hoặc với giá trị mặc định
    if (!doanPhi) {
      // Bạn có thể tạo một bản ghi mặc định ở đây nếu muốn, hoặc để client xử lý
      // Hoặc trả về object với các giá trị mặc định
      doanPhi = {
        id: '', // Hoặc null
        maDV: maDV,
        hk1: 0, hk2: 0, hk3: 0, hk4: 0, hk5: 0, hk6: 0, hk7: 0, hk8: 0,
        createdAt: new Date(), // Hoặc null
        updatedAt: new Date(), // Hoặc null
        // Không có doanVien ở đây để tránh vòng lặp
      };
    }

    return NextResponse.json(doanPhi);
  } catch (error) {
    console.error(`GET /api/doanphi/${maDV} error:`, error);
    return NextResponse.json(
      { message: `Lỗi khi lấy thông tin Đoàn phí của '${maDV}'`, error: (error as Error).message },
      { status: 500 }
    );
  }
}