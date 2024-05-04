import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams{
    scoreId?: string
}

export async function DELETE( request: Request, 
    { params }: { params: IParams })
{   
     // Kiểm tra xem người dùng có tồn tại không
     
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }

    const {scoreId} = params
    if(!scoreId || typeof scoreId !== 'string'){
        throw new Error('Invalid ID')
    }

    const deleteScore = await prisma.score.deleteMany({
        where:{
            id: scoreId,
            tradeId: currentUser.id
        }
    })
    return NextResponse.json(deleteScore)
}