import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";

// Zod schema for validation
const evaluationSchema = z.object({
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
    console.log("POST /api/evaluations body:", body);
    const data = evaluationSchema.parse(body);

    // Kiểm tra đã có đánh giá cho maDV + semester chưa
    const existing = await prisma.evaluation.findFirst({
      where: {
        maDV: data.maDV,
        semester: data.semester,
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Đã tồn tại đánh giá cho đơn vị này." },
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

// GET: Lấy đánh giá theo maDV và semester
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const maDV = searchParams.get("maDV");
    const semester = searchParams.get("semester");
    const searchMaDV = searchParams.get("searchMaDV");
    const searchSemester = searchParams.get("searchSemester");

    const where: any = {};

    if (maDV) {
      where.maDV = maDV;
    }

    if (semester) {
      where.semester = parseInt(semester);
    }

    if (searchMaDV) {
      where.maDV = {
        contains: searchMaDV,
        mode: 'insensitive'
      };
    }

    if (searchSemester) {
      where.semester = parseInt(searchSemester);
    }

    const evaluations = await prisma.evaluation.findMany({
      where,
      include: {
        doanVien: true
      }
    });

    return NextResponse.json(evaluations);
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    return NextResponse.json(
      { error: "Failed to fetch evaluations" },
      { status: 500 }
    );
  }
}
