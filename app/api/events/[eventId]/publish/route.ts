
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"


export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    


    const deletedCourse = await prisma.event.delete({
      where: {
        id: params.eventId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[EVENTS_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;

    const { eventId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.event.update({
      where: {
        id: eventId,
        userId
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}