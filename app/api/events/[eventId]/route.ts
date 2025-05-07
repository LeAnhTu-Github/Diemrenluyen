import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import { Prisma } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;
    const { eventId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Kiểm tra sự kiện tồn tại
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId, userId },
    });
    if (!existingEvent) {
      return new NextResponse("Event not found or unauthorized", { status: 404 });
    }

    // Kiểm tra định dạng ngày
    const parsedDate = values.date ? new Date(values.date) : null;
    if (values.date && (!parsedDate || isNaN(parsedDate.getTime()))) {
      return new NextResponse("Invalid date format", { status: 400 });
    }

    const data = {
      ...values,
      date: parsedDate,
    };

    const event = await prisma.event.update({
      where: { id: eventId, userId },
      data,
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[EVENT_ID_UPDATE]", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new NextResponse("Event not found", { status: 404 });
      }
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}