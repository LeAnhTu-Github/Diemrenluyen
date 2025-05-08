import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";
import { Prisma } from '@prisma/client';

// --- GET - Lấy danh sách đoàn viên (có tìm kiếm và lọc) ---
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const maCD = searchParams.get('maCD') || undefined;
  const hocKyParam = searchParams.get('hocKy') || undefined;
  const hocKy = hocKyParam && hocKyParam !== 'all'
    ? parseInt(hocKyParam, 10)
    : undefined;
  const search = searchParams.get('search') || undefined;
  const chucVu = searchParams.get('chucVu') || undefined;

  const whereClause: Prisma.DoanVienWhereInput = {};
  if (maCD) whereClause.maCD = maCD;
  if (chucVu) whereClause.chucVu = chucVu;

  if (search) {
    whereClause.OR = [
      { hoDV: { contains: search, mode: 'insensitive' } },
      { tenDV: { contains: search, mode: 'insensitive' } },
    ];
  }

  const doanViens = await prisma.doanVien.findMany({
    where: whereClause,
    include: { chiDoan: true },
    orderBy: { hoDV: 'asc' }
  });

  let renLuyenMap: Record<string, { diem: number; xepLoai: string | null }> = {};
  if (hocKy !== undefined) {
    const renLuyens = await prisma.renLuyen.findMany({
      where: {
        maDV: { in: doanViens.map(d => d.maDV) },
        hocKy
      }
    });
    renLuyens.forEach(r => {
      renLuyenMap[r.maDV] = { diem: r.diem, xepLoai: r.xepLoai };
    });
  }

  return NextResponse.json({ doanViens, renLuyenMap });
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
    if (!maDV || !hoDV || !tenDV || !maCD || !ngaySinh || gioiTinh === undefined || !ngayVaoDoan || !queQuan || !chucVu) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc.' }, { status: 400 });
    }
    const chiDoanExists = await prisma.chiDoan.findUnique({ where: { maCD: maCD as string } });
    if (!chiDoanExists) {
      return NextResponse.json({ message: `Chi đoàn với mã '${maCD}' không tồn tại.` }, { status: 400 });
    }
    const doanVien = await prisma.doanVien.create({
      data: {
        maDV, hoDV, tenDV,
        ngaySinh: new Date(ngaySinh),
        gioiTinh: parseInt(gioiTinh as string, 10),
        ngayVaoDoan: new Date(ngayVaoDoan),
        queQuan, chucVu,
        chiDoan: { connect: { maCD: maCD as string } },
      },
      include: { chiDoan: true }
    });
    return NextResponse.json(doanVien, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/doanvien error:', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('MADV_unique')) {
      const attemptedMaDV = requestData?.maDV || "không xác định";
      return NextResponse.json({ message: `Đoàn viên với mã '${attemptedMaDV}' đã tồn tại.` }, { status: 409 });
    }
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ khi thêm đoàn viên', error: error.message }, { status: 500 });
  }
}

// --- PUT - Cập nhật thông tin đoàn viên ---
export async function PUT(req: Request) {
  let requestData: any;
  try {
    requestData = await req.json();
    const { maDV, hoDV, tenDV, ngaySinh, gioiTinh, ngayVaoDoan, queQuan, chucVu, maCD } = requestData;
    if (!maDV) {
      return NextResponse.json({ message: 'Thiếu mã đoàn viên (maDV) trong body.' }, { status: 400 });
    }

    const updateData: any = {};
    if (hoDV !== undefined) updateData.hoDV = hoDV;
    if (tenDV !== undefined) updateData.tenDV = tenDV;
    if (ngaySinh !== undefined) updateData.ngaySinh = new Date(ngaySinh);
    if (gioiTinh !== undefined) updateData.gioiTinh = parseInt(gioiTinh as string, 10);
    if (ngayVaoDoan !== undefined) updateData.ngayVaoDoan = new Date(ngayVaoDoan);
    if (queQuan !== undefined) updateData.queQuan = queQuan;
    if (chucVu !== undefined) updateData.chucVu = chucVu;

    if (maCD !== undefined) {
      const chiDoanExists = await prisma.chiDoan.findUnique({ where: { maCD: maCD as string } });
      if (!chiDoanExists) {
        return NextResponse.json({ message: `Chi đoàn với mã '${maCD}' không tồn tại.` }, { status: 400 });
      }
      updateData.chiDoan = { connect: { maCD: maCD as string } };
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: 'Không có dữ liệu để cập nhật.' }, { status: 400 });
    }

    const updatedDoanVien = await prisma.doanVien.update({
      where: { maDV: maDV as string },
      data: updateData,
      include: { chiDoan: true }
    });

    return NextResponse.json(updatedDoanVien);
  } catch (error: any) {
    console.error('PUT /api/doanvien error:', error);
    if (error.code === 'P2025') {
      const attemptedMaDV = requestData?.maDV || "không xác định";
      return NextResponse.json({ message: `Đoàn viên với mã '${attemptedMaDV}' không tìm thấy.` }, { status: 404 });
    }
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ khi cập nhật đoàn viên', error: error.message }, { status: 500 });
  }
}

// --- DELETE - Xoá đoàn viên theo mã ---
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const maDV = searchParams.get('maDV');
    if (!maDV) {
      return NextResponse.json({ message: 'Thiếu tham số maDV trong query.' }, { status: 400 });
    }

    const doanVienExists = await prisma.doanVien.findUnique({
      where: { maDV },
      include: { doanPhi: true }
    });

    if (!doanVienExists) {
      return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' không tìm thấy.` }, { status: 404 });
    }

    // Xoá các liên kết liên quan
    if (doanVienExists.doanPhi) {
      await prisma.doanPhi.delete({ where: { maDV } });
    }
    await prisma.kTKL.deleteMany({ where: { maDV } });
    await prisma.renLuyen.deleteMany({ where: { maDV } });

    const deletedDoanVien = await prisma.doanVien.delete({ where: { maDV } });
    return NextResponse.json({ message: `Đoàn viên với mã '${maDV}' đã xóa.`, deletedData: deletedDoanVien });
  } catch (error: any) {
    console.error('DELETE /api/doanvien error:', error);
    return NextResponse.json({ message: 'Lỗi máy chủ nội bộ khi xoá đoàn viên', error: error.message }, { status: 500 });
  }
}
