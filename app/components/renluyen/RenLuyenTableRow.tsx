'use client';

import React, { useState, useEffect } from 'react';
import { SafeDoanVien } from '@/app/types';
import { toast } from 'react-hot-toast';

interface RenLuyenTableRowProps {
  stt: number;
  doanVien: SafeDoanVien;
  initialDiem: number | null;
  initialXepLoai: string;
  xepLoaiOptions: string[];
  onSave: (maDV: string, diem: number | null, xepLoai: string) => Promise<void>;
  isTableLoading?: boolean;
  hideRen?: boolean;
}

const RenLuyenTableRow: React.FC<RenLuyenTableRowProps> = ({
  stt,
  doanVien,
  initialDiem,
  initialXepLoai,
  xepLoaiOptions,
  onSave,
  isTableLoading = false,
  hideRen = false,
}) => {
  const [diem, setDiem] = useState<string>(initialDiem !== null ? String(initialDiem) : '');
  const [xepLoai, setXepLoai] = useState<string>(initialXepLoai);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setDiem(initialDiem !== null ? String(initialDiem) : '');
    setXepLoai(initialXepLoai);
    setHasChanged(false);
  }, [initialDiem, initialXepLoai]);

  const handleDiemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiem(e.target.value);
    setHasChanged(true);
  };
  const handleXepLoaiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setXepLoai(e.target.value);
    setHasChanged(true);
  };

  const handleSaveClick = async () => {
    const parsedDiem = diem.trim() === '' ? null : parseInt(diem, 10);
    if (diem.trim() !== '' && (isNaN(parsedDiem as number) || parsedDiem! < 0 || parsedDiem! > 100)) {
      toast.error(`Điểm của ${doanVien.maDV} phải là số 0–100 hoặc để trống.`);
      return;
    }
    if (!xepLoai && parsedDiem !== null) {
      toast.error(`Vui lòng chọn xếp loại cho ${doanVien.maDV}.`);
      return;
    }
    if (parsedDiem === null && xepLoai !== '') {
      toast.error(`Không thể có xếp loại khi điểm trống cho ${doanVien.maDV}.`);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(doanVien.maDV, parsedDiem, xepLoai);
      setHasChanged(false);
    } finally {
      setIsSaving(false);
    }
  };

  const isSaveDisabled = isTableLoading || isSaving || !hasChanged;

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-500">{stt}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{doanVien.maDV}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{`${doanVien.hoDV} ${doanVien.tenDV}`}</td>

      {!hideRen && (
        <>
          <td className="px-6 py-4">
            <input
              type="number"
              min="0"
              max="100"
              value={diem}
              onChange={handleDiemChange}
              disabled={isTableLoading || isSaving}
              className="w-20 px-2 py-1 border rounded disabled:bg-gray-100"
            />
          </td>
          <td className="px-6 py-4">
            <select
              value={xepLoai}
              onChange={handleXepLoaiChange}
              disabled={isTableLoading || isSaving}
              className="w-32 px-2 py-1 border rounded disabled:bg-gray-100"
            >
              <option value="">-- Chọn --</option>
              {xepLoaiOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </td>
          <td className="px-6 py-4 text-center">
            <button
              onClick={handleSaveClick}
              disabled={isSaveDisabled}
              className={`px-4 py-1 rounded text-white font-semibold ${
                isSaveDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu'}
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default RenLuyenTableRow;
