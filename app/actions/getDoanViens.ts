import prisma from "@/app/libs/prismadb";

export default async function getDoanViens() {
  try {
    const doanViens = await prisma.doanVien.findMany({
      include: {
        chiDoan: {
          include: {
            doanCS: true
          }
        }
      },
      orderBy: {
        hoDV: 'asc'
      }
    });

    return doanViens;
  } catch (error: any) {
    throw new Error(error);
  }
} 