import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

interface Params { maDV: string; hocKy: string; }

export async function PUT(req: Request, { params }: { params: Params }) {
  const { maDV, hocKy } = params;
  const hk = parseInt(hocKy, 10);
  const { diem, xepLoai } = await req.json();

  const updated = await prisma.renLuyen.upsert({
    where: { maDV_hocKy: { maDV, hocKy: hk } },
    create: { maDV, hocKy: hk, diem: diem ?? 0, xepLoai },
    update: { diem: diem ?? 0, xepLoai }
  });
  return NextResponse.json(updated);
}

export async function GET(req: Request, { params }: { params: Params }) {
  const { maDV, hocKy } = params;
  const hk = parseInt(hocKy, 10);
  const rl = await prisma.renLuyen.findUnique({ where: { maDV_hocKy: { maDV, hocKy: hk } } });
  if (!rl) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(rl);
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { maDV, hocKy } = params;
  const hk = parseInt(hocKy, 10);
  await prisma.renLuyen.delete({ where: { maDV_hocKy: { maDV, hocKy: hk } } });
  return NextResponse.json({ message: 'Deleted' });
}
