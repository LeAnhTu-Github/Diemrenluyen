import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Lấy phân bố đánh giá
    const evaluations = await prisma.evaluation.groupBy({
      by: ['rating'],
      _count: true,
    });

    // Chuyển đổi dữ liệu cho biểu đồ
    const evaluationData = evaluations.map(evaluation => ({
      name: `Đánh giá ${evaluation.rating}`,
      value: evaluation._count,
    }));

    return NextResponse.json(evaluationData);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
