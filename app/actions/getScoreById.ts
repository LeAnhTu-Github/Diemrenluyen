import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export default async function getScoreById(
  params: IParams
) {
  try {
    const { id } = params;

    const listing = await prisma.score.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true
        
      }
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: 
          listing.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}