import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Lấy danh sách sự kiện và số người tham gia
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: {
            userRegister: true // Thay đổi từ registers thành userRegister
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Lấy 10 sự kiện gần nhất
    });

    // Chuyển đổi dữ liệu cho biểu đồ
    const eventData = events.map(event => ({
      name: event.title,
      value: event._count.userRegister
    }));

    return NextResponse.json(eventData);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
