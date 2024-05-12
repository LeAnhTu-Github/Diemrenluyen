import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { PrismaClient } from "@prisma/client"; // Add this import statement

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
      const { 
      id,
      msv ,
      name,
      email,
      phone,
      classUneti,
      question,
      userId     
       } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });
const prisma = new PrismaClient(); // Create a new instance of the Prisma client


const event = await prisma.register.create({
  data: {
    id,
    msv,
    name,
    email: currentUser.email,
    classUneti,
    question,
    userId: currentUser.id,
  }
});

  return NextResponse.json(event);
}