// app/actions/getDoanViensWithRenLuyen.ts
import prisma from "@/app/libs/prismadb";
import { RenLuyen, DoanVien } from "@prisma/client";

interface Params {
  maCD: string;
  hocKy: number;
}

// Kiểu dữ liệu trả về
export type SafeDoanVienForRenLuyen = Omit<DoanVien, 'createdAt' | 'updatedAt' | 'chiDoan' | 'doanPhi' | 'ktkls' | 'renLuyens'> & {
    ngaySinh?: string | null;
    ngayVaoDoan?: string | null;
};

export type RenLuyenEntry = Pick<RenLuyen, 'diem' | 'xepLoai'>;
export type RenLuyenDataMap = Record<string, RenLuyenEntry>;

export interface RenLuyenDataResult {
    doanViens: SafeDoanVienForRenLuyen[];
    renLuyenMap: RenLuyenDataMap;
}

export default async function getDoanViensWithRenLuyen(
  params: Params
): Promise<RenLuyenDataResult | null> {
  try {
    const { maCD, hocKy } = params;

    if (!maCD || hocKy === undefined || isNaN(hocKy) || hocKy < 1) {
      console.warn("Invalid params for getDoanViensWithRenLuyen:", params);
      return null;
    }

    console.log(`Fetching DoanViens for maCD: ${maCD}, hocKy: ${hocKy}`);

    const doanViensWithData = await prisma.doanVien.findMany({
      where: {
        maCD: maCD,
      },
      select: { // Chỉ chọn các trường cần thiết của DoanVien
        id: true, maDV: true, hoDV: true, tenDV: true, maCD: true,
        ngaySinh: true, ngayVaoDoan: true, gioiTinh: true, queQuan: true, chucVu: true, // Giữ lại nếu cần ở Row
        renLuyens: {
          where: { hocKy: hocKy },
          select: { diem: true, xepLoai: true }
        },
      },
      orderBy: [{ hoDV: 'asc' }, { tenDV: 'asc' }],
    });

    console.log(`Found ${doanViensWithData.length} DoanViens for maCD: ${maCD}`);

    const renLuyenMap: RenLuyenDataMap = {};
    doanViensWithData.forEach(dv => {
      if (dv.renLuyens && dv.renLuyens.length > 0) {
        renLuyenMap[dv.maDV] = {
            diem: dv.renLuyens[0].diem,
            xepLoai: dv.renLuyens[0].xepLoai
        };
      }
    });

    // Chuyển đổi Date thành string và loại bỏ renLuyens
    const finalDoanViens: SafeDoanVienForRenLuyen[] = doanViensWithData.map(({ renLuyens, ngaySinh, ngayVaoDoan, ...rest }) => ({
        ...rest,
        ngaySinh: ngaySinh?.toISOString(), // Chuyển Date -> string
        ngayVaoDoan: ngayVaoDoan?.toISOString(), // Chuyển Date -> string
    }));

    return {
        doanViens: finalDoanViens,
        renLuyenMap: renLuyenMap
    };

  } catch (error: any) {
    console.error("Error fetching DoanViens with RenLuyen:", error);
    return null;
  }
}