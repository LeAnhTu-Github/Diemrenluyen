// app/components/renluyen/RenLuyenTable.tsx
'use client';
// ... (code RenLuyenTable giữ nguyên) ...
import React from 'react';
import { SafeDoanVien } from '@/app/types';
import { RenLuyen } from '@prisma/client';
import RenLuyenTableRow from './RenLuyenTableRow';

type RenLuyenEntry = Pick<RenLuyen, 'diem' | 'xepLoai'>;
type RenLuyenDataMap = Record<string, RenLuyenEntry>;

interface RenLuyenTableProps {
  doanViens: SafeDoanVien[];
  renLuyenData: RenLuyenDataMap;
  xepLoaiOptions: string[];
  onSaveRow: (maDV: string, diem: number | null, xepLoai: string) => Promise<void>;
  isLoading?: boolean;
  selectedHocKy: number | null;
}

const RenLuyenTable: React.FC<RenLuyenTableProps> = ({
  doanViens,
  renLuyenData,
  xepLoaiOptions,
  onSaveRow,
  isLoading = false,
  selectedHocKy
}) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-600 text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">STT</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mã Đoàn viên</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Họ Tên Đoàn viên</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Điểm (HK {selectedHocKy ?? '...'})</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Xếp Loại (HK {selectedHocKy ?? '...'})</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doanViens.map((dv, index) => (
            <RenLuyenTableRow
              key={dv.maDV}
              stt={index + 1}
              doanVien={dv}
              initialDiem={renLuyenData[dv.maDV]?.diem ?? null}
              initialXepLoai={renLuyenData[dv.maDV]?.xepLoai ?? ''}
              xepLoaiOptions={xepLoaiOptions}
              onSave={onSaveRow}
              isTableLoading={isLoading}
            />
          ))}
          {doanViens.length === 0 && !isLoading && (
              <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                      { selectedHocKy !== null ? "Không có đoàn viên nào trong chi đoàn này." : "Vui lòng chọn Chi đoàn và Học kỳ."}
                  </td>
              </tr>
          )}
           {isLoading && (
              <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                      Đang tải...
                  </td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RenLuyenTable;