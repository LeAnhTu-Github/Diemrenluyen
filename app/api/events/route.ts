import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"


export async function POST(
  req: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id;
    const { title } = await req.json();


    const event = await prisma.event.create({
        data: {
            title,
            userId: userId!, // Assert that userId is not null
            // Add other missing properties here
        }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}