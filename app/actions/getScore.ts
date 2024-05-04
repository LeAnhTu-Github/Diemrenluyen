import prisma from "@/app/libs/prismadb";

export  interface IListingsParams {

  tradeId?: string;
  name?: string;
  email?: string;
  increasePoint?: number;
  decreasePoint?: number;
  totalScore?: number;
  imageSrc?: string;
  department?: string;
  classUneti?: string;
  courses?: string;

}

export default async function getScore(
  params: IListingsParams
) {
  try {
    const {
      tradeId,
      name,
      email,
      increasePoint, 
      decreasePoint, 
      totalScore, 
      imageSrc,
    } = params;

    let query: any = {};

    if (tradeId) {
      query.userId = tradeId;
    }


    if (increasePoint) {
      query.increasePoint = {
        gte: +increasePoint
      }
    }

    if (decreasePoint) {
      query.guestCount = {
        gte: +decreasePoint
      }
    }

    if (totalScore) {
      query.totalScore = {
        gte: +totalScore
      }
    }

    if (imageSrc) {
      query.imageSrc = imageSrc;
    }

    const listings = await prisma.score.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeScores = listings.map((score) => ({
      ...score,
      createdAt: score.createdAt.toISOString(),
    }));

    return safeScores;
  } catch (error: any) {
    throw new Error(error);
  }
}