import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn này chính xác đến file prisma client của bạn.
// Ví dụ: import prisma from '@/lib/prismadb';
import prisma from "@/app/libs/prismadb"; // Giữ nguyên theo yêu cầu của bạn, đảm bảo file này tồn tại và cấu hình đúng

// --- GET - Lấy tất cả đoàn viên ---
export async function GET(req: Request) {
  try {
    const doanViens = await prisma.doanVien.findMany({
      include: {
        chiDoan: { // Lấy thông tin Chi Đoàn liên quan
          include: {
            doanCS: true // Lồng thêm thông tin Đoàn Cơ Sở của Chi Đoàn
          }
        },
        doanPhi: true,  // Lấy thông tin Đoàn Phí (nếu có)
        ktkls: true,    // Lấy danh sách Khen thưởng/Kỷ luật
        renLuyens: true // Lấy danh sách Rèn luyện
      },
      orderBy: { // Sắp xếp theo tổ hợp họ và tên
        hoDV: 'asc',
        // tenDV: 'asc', // Prisma không hỗ trợ sắp xếp theo nhiều trường trực tiếp trong orderBy của MongoDB findMany theo cách này.
                        // Bạn có thể cần sắp xếp ở client hoặc lấy tất cả rồi sắp xếp ở server sau khi query.
                        // Hoặc nếu chỉ cần sắp xếp theo một trường chính, ví dụ tenDV:
                        // tenDV: 'asc'
      },
    });
    // Nếu cần sắp xếp phức tạp hơn, bạn có thể sắp xếp sau khi lấy dữ liệu
    // doanViens.sort((a, b) => (a.hoDV + " " + a.tenDV).localeCompare(b.hoDV + " " + b.tenDV));

    return NextResponse.json(doanViens);
  } catch (error) {
    console.error('GET /api/doanvien error:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách đoàn viên', error: (error as Error).message },
      { status: 500 }
    );
  }
}


// --- POST - Thêm mới đoàn viên ---
export async function POST(req: Request) {
  let requestData: any;

  try {
    requestData = await req.json();
    const {
      maDV, hoDV, tenDV, ngaySinh,
      gioiTinh, ngayVaoDoan, queQuan,
      chucVu, maCD,
    } = requestData;

    // 1. Validation cơ bản
    if (!maDV || !hoDV || !tenDV || !maCD || !ngaySinh || gioiTinh === undefined || !ngayVaoDoan || !queQuan || !chucVu) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc. Vui lòng cung cấp đủ: maDV, hoDV, tenDV, maCD, ngaySinh, gioiTinh, ngayVaoDoan, queQuan, chucVu.' }, { status: 400 });
    }

    // 2. Kiểm tra sự tồn tại của ChiDoan trước khi tạo DoanVien
    const chiDoanExists = await prisma.chiDoan.findUnique({
      where: { maCD: maCD as string }, // Prisma map "MACD" thành maCD trong model
    });

    if (!chiDoanExists) {
      return NextResponse.json({ message: `Chi đoàn với mã '${maCD}' không tồn tại. Không thể tạo đoàn viên.` }, { status: 400 });
    }

    // 3. Tạo Đoàn viên
    const doanVien = await prisma.doanVien.create({
      data: {
        maDV,       // Tên trường trong model là maDV, Prisma sẽ map tới "MADV" trong DB
        hoDV,       // Tương tự, map tới "HODV"
        tenDV,      // Map tới "TENDV"
        ngaySinh: new Date(ngaySinh), // Map tới "NGAYSINH"
        gioiTinh: parseInt(gioiTinh as string, 10), // Map tới "GIOITINH"
        ngayVaoDoan: new Date(ngayVaoDoan), // Map tới "NGAYVAODOAN"
        queQuan,    // Map tới "QUEQUAN"
        chucVu,     // Map tới "CHUCVU"
        // maCD được dùng để connect, không phải là một trường dữ liệu trực tiếp của DoanVien trong data payload này
        chiDoan: {
          connect: { maCD: maCD as string }, // Kết nối tới ChiDoan thông qua trường @unique maCD của ChiDoan
        },
      },
      include: { // Trả về thông tin Chi Đoàn đã liên kết
        chiDoan: true,
      }
    });

    return NextResponse.json(doanVien, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/doanvien error:', error);
    // Kiểm tra lỗi unique constraint cho maDV (MADV_unique là tên constraint trong DB)
    if (error.code === 'P2002' && error.meta?.target?.includes('MADV_unique')) {
      const attemptedMaDV = requestData?.maDV || "không xác định";
      return NextResponse.json({ message: `Đoàn viên với mã '${attemptedMaDV}' đã tồn tại.` }, { status: 409 });
    }
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi liên quan (ví dụ ChiDoan)
      return NextResponse.json({ message: `Lỗi khi tạo đoàn viên: ${error.meta?.cause || 'Không tìm thấy bản ghi liên quan cần thiết.'}` }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi thêm đoàn viên', error: error.message },
      { status: 500 }
    );
  }
}

// --- PUT - Cập nhật thông tin đoàn viên ---
export async function PUT(req: Request) {
  let requestData: any;

  try {
    requestData = await req.json();
    const {
      maDV, // Dùng để tìm đoàn viên cần cập nhật (không được thay đổi qua PUT này)
      hoDV, tenDV, ngaySinh,
      gioiTinh, ngayVaoDoan, queQuan,
      chucVu, maCD, // maCD mới (nếu có để thay đổi Chi Đoàn)
    } = requestData;

    if (!maDV) {
      return NextResponse.json({ message: 'Thiếu mã đoàn viên (maDV) trong body để cập nhật.' }, { status: 400 });
    }

    // Dữ liệu để cập nhật
    const updateData: any = {};
    if (hoDV !== undefined) updateData.hoDV = hoDV;
    if (tenDV !== undefined) updateData.tenDV = tenDV;
    if (ngaySinh !== undefined) updateData.ngaySinh = new Date(ngaySinh);
    if (gioiTinh !== undefined) updateData.gioiTinh = parseInt(gioiTinh as string, 10);
    if (ngayVaoDoan !== undefined) updateData.ngayVaoDoan = new Date(ngayVaoDoan);
    if (queQuan !== undefined) updateData.queQuan = queQuan;
    if (chucVu !== undefined) updateData.chucVu = chucVu;

    // Xử lý cập nhật liên kết Chi Đoàn nếu maCD được cung cấp
    if (maCD !== undefined) {
      const chiDoanExists = await prisma.chiDoan.findUnique({
        where: { maCD: maCD as string },
      });
      if (!chiDoanExists) {
        return NextResponse.json({ message: `Chi đoàn với mã '${maCD}' không tồn tại. Không thể cập nhật liên kết.` }, { status: 400 });
      }
      // Để thay đổi Chi Đoàn, bạn cần cập nhật trường quan hệ
      updateData.chiDoan = {
        connect: { maCD: maCD as string }
      };
    }

    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ message: 'Không có dữ liệu nào được cung cấp để cập nhật.' }, { status: 400 });
    }

    const updatedDoanVien = await prisma.doanVien.update({
      where: { maDV: maDV as string }, // Tìm DoanVien bằng maDV (unique)
      data: updateData,
      include: {
          chiDoan: true // Bao gồm cả thông tin Chi Đoàn sau khi cập nhật
      }
    });

    return NextResponse.json(updatedDoanVien);
  } catch (error: any) {
    console.error('PUT /api/doanvien error:', error);
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi để cập nhật hoặc liên kết
      const cause = error.meta?.cause as string || "";
      const attemptedMaDV = requestData?.maDV || "không xác định";
      // P2025 có thể do DoanVien không tồn tại hoặc ChiDoan (nếu connect) không tồn tại
      if (cause.toLowerCase().includes("record to update not found")) {
        return NextResponse.json({ message: `Đoàn viên với mã '${attemptedMaDV}' không tìm thấy.` }, { status: 404 });
      }
      return NextResponse.json({ message: `Lỗi khi cập nhật đoàn viên '${attemptedMaDV}': ${cause || 'Không tìm thấy bản ghi cần thiết.'}` }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi cập nhật đoàn viên', error: error.message },
      { status: 500 }
    );
  }
}

// --- DELETE - Xoá đoàn viên theo mã ---
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const maDV = searchParams.get('maDV');

    if (!maDV) {
      return NextResponse.json({ message: 'Thiếu tham số maDV trong query để xoá.' }, { status: 400 });
    }

    // 1. Kiểm tra sự tồn tại của DoanVien trước khi xóa
    const doanVienExists = await prisma.doanVien.findUnique({
        where: { maDV },
        include: { doanPhi: true } // Kiểm tra xem có DoanPhi không để xóa
    });

    if (!doanVienExists) {
        return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' không tìm thấy để xóa.` }, { status: 404 });
    }

    // 2. Xử lý xóa các bản ghi liên quan TRƯỚC KHI xóa DoanVien
    // (Thứ tự xóa quan trọng nếu có ràng buộc hoặc để tránh lỗi)

    // 2a. Xóa DoanPhi (nếu tồn tại và có quan hệ 1-1)
    if (doanVienExists.doanPhi) {
      await prisma.doanPhi.delete({ where: { maDV } }); // DoanPhi có maDV là unique
    }

    // 2b. Xóa các bản ghi KTKL
    await prisma.kTKL.deleteMany({ where: { maDV } });

    // 2c. Xóa các bản ghi RenLuyen
    await prisma.renLuyen.deleteMany({ where: { maDV } });

    // 3. Sau đó mới xóa DoanVien
    const deletedDoanVien = await prisma.doanVien.delete({
      where: { maDV },
    });

    return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' đã được xóa thành công.`, deletedData: deletedDoanVien });
    // Hoặc: return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error: any) {
    console.error('DELETE /api/doanvien error:', error);
    if (error.code === 'P2025') { // Lỗi không tìm thấy bản ghi để xóa (dù đã check, nhưng có thể do race condition)
      return NextResponse.json({ message: `Không tìm thấy đoàn viên với mã '${new URL(req.url).searchParams.get('maDV')}' để xoá.` }, { status: 404 });
    }
    // Các lỗi khác (ví dụ P2003 nếu có ràng buộc chưa xử lý)
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi xoá đoàn viên', error: error.message },
      { status: 500 }
    );
  }
}