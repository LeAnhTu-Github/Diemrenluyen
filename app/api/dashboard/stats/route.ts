import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Lấy tổng số liệu
    const [doanCoSo, chiDoan, doanVien, suKien, danhGia] = await Promise.all([
      prisma.doanCS.count(),
      prisma.chiDoan.count(),
      prisma.doanVien.count(),
      prisma.event.count(),
      prisma.evaluation.count(),
    ]);

    return NextResponse.json({
      doanCoSo,
      chiDoan,
      doanVien,
      suKien,
      danhGia,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
