// app/actions/getChiDoansForSelect.ts
import prisma from "@/app/libs/prismadb";

/**
 * Action để lấy danh sách các Chi đoàn dùng cho việc chọn lựa (select/dropdown).
 * Chỉ lấy các trường cần thiết là maCD và tenCD.
 * @returns Promise<Array<{ maCD: string; tenCD: string }>>
 */
export default async function getChiDoansForSelect() {
  console.log("[Action] Fetching Chi Doans for select...");
  try {
    const chiDoans = await prisma.chiDoan.findMany({
      select: {
        maCD: true,
        tenCD: true,
      },
      orderBy: {
        tenCD: 'asc',
      }
    });
    console.log(`[Action] Found ${chiDoans.length} Chi Doans for select.`);
    return chiDoans;
  } catch (error: any) {
    console.error("[Action] Error fetching ChiDoans for select:", error);
    return []; // Trả về mảng rỗng khi lỗi
  }
}