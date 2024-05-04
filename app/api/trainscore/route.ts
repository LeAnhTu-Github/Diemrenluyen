import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
      const { 
        name,
        email,
        avatar,
        increasePoint,
        decreasePoint,
        totalScore,
        imageSrc, 
        department,
        classUneti,
        courses,
       } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });

const score = await prisma.score.create({
  data: {
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.image,
    increasePoint,
    decreasePoint,
    totalScore,
    imageSrc,
    classUneti,
    courses, // Change 'course' to 'courses'
    department,
   
    tradeId: currentUser.id,
  }
});

  return NextResponse.json(score);
}