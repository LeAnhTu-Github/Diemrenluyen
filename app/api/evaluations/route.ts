import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";

// Zod schema for validation
const evaluationSchema = z.object({
  userId: z.string(),
  year: z.number(),
  semester: z.number().optional(),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  reward: z.string().optional(),
  discipline: z.string().optional(),
  rating: z.number().optional(),
  maDV: z.string().optional(),
});

// POST: Thêm đánh giá mới
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = evaluationSchema.parse(body);

    // Kiểm tra đã có đánh giá cho userId + year + semester chưa
    const existing = await prisma.evaluation.findFirst({
      where: {
        userId: data.userId,
        year: data.year,
        semester: data.semester,
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Đã tồn tại đánh giá cho người dùng này." },
        { status: 400 }
      );
    }

    const evaluation = await prisma.evaluation.create({ data });
    return NextResponse.json(evaluation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi không xác định" }, { status: 400 });
  }
}

// PUT: Cập nhật đánh giá (theo id)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: "Thiếu id đánh giá." }, { status: 400 });
    }
    const data = evaluationSchema.partial().parse(updateData);

    const updated = await prisma.evaluation.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi không xác định" }, { status: 400 });
  }
}
