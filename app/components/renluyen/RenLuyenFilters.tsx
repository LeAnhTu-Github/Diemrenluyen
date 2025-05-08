// app/components/renluyen/RenLuyenFilters.tsx
'use client';
// ... (code RenLuyenFilters giữ nguyên) ...
import React from 'react';
import { ChiDoan } from '@prisma/client';

type ChiDoanOption = Pick<ChiDoan, 'maCD' | 'tenCD'>;

interface RenLuyenFiltersProps {
  chiDoans: ChiDoanOption[];
  hocKyList: number[];
  selectedMaCD: string | null;
  selectedHocKy: number | null;
  onChiDoanChange: (maCD: string | null) => void;
  onHocKyChange: (hocKy: number | null) => void;
  disabled?: boolean;
}

const RenLuyenFilters: React.FC<RenLuyenFiltersProps> = ({
  chiDoans,
  hocKyList,
  selectedMaCD,
  selectedHocKy,
  onChiDoanChange,
  onHocKyChange,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-md shadow-sm bg-gray-50">
      {/* Chọn Chi Đoàn */}
      <div>
        <label htmlFor="filterMaCD-rl" className="block text-sm font-medium text-gray-700 mb-1">Chọn Chi Đoàn</label>
        <select
          id="filterMaCD-rl" // Thêm suffix để tránh trùng ID nếu có filter khác
          value={selectedMaCD ?? ''}
          onChange={(e) => onChiDoanChange(e.target.value || null)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white disabled:bg-gray-100"
        >
          <option value="">-- Chọn Chi Đoàn --</option>
          {chiDoans.map(cd => (
            <option key={cd.maCD} value={cd.maCD}>
              {cd.tenCD} ({cd.maCD})
            </option>
          ))}
        </select>
      </div>

      {/* Chọn Học Kỳ */}
      <div>
        <label htmlFor="filterHocKy-rl" className="block text-sm font-medium text-gray-700 mb-1">Chọn Học Kỳ</label>
        <select
          id="filterHocKy-rl" // Thêm suffix
          value={selectedHocKy ?? ''}
          onChange={(e) => onHocKyChange(e.target.value ? parseInt(e.target.value, 10) : null)}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white disabled:bg-gray-100"
        >
          <option value="">-- Chọn Học Kỳ --</option>
          {hocKyList.map(hk => (
            <option key={hk} value={hk}>
              Học Kỳ {hk}
            </option>
          ))}
        </select>
      </div>

       {/* Placeholder cho nút (nếu cần) */}
       <div className="flex items-end">
            {/* <button>...</button> */}
        </div>
    </div>
  );
};

export default RenLuyenFilters;