import prisma from "@/app/libs/prismadb";

export  interface RegisParam {
    id?: string;
  userId?: string;
  
    msv?:       String;
    name ?:      String;
    email ?:     String;
    phone ?:     String
    classUneti?: String;
    question ?:  String;
}
export default async function getScore(
  params: RegisParam
) {
  try {
    const {
      id,
      userId,
        msv,
        name,
        email,
        phone,
        classUneti,
        question
    } = params;

    let query: any = {};

    if (id) {
      query.id = id;
    }


    if (msv) {
      query.msv = {
        gte: +msv
      }
    }

   

    const registers = await prisma.register.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeRegister = registers.map((score) => ({
      ...score,
      createdAt: score.createdAt.toISOString(),
    }));

    return safeRegister;
  } catch (error: any) {
    throw new Error(error);
  }
}