import prisma from "@/app/libs/prismadb";
import { User } from "@prisma/client";

interface IParams {
  userId: string;
}

export async function getUserById(params: IParams): Promise<User | null> {
  try {
    const { userId } = params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
