'use client';

import { SafeDoanVien } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface DoanVienListProps {
  doanViens: SafeDoanVien[];
  onEdit: (doanVien: SafeDoanVien) => void;
  onDelete: (maDV: string) => void;
  isLoading?: boolean;
}

const DoanVienList: React.FC<DoanVienListProps> = ({
  doanViens,
  onEdit,
  onDelete,
  isLoading
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã ĐV</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ và tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày vào Đoàn</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quê quán</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức vụ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chi Đoàn</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {doanViens.map((doanVien) => (
            <tr key={doanVien.maDV}>
              <td className="px-6 py-4 whitespace-nowrap">{doanVien.maDV}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`${doanVien.hoDV} ${doanVien.tenDV}`}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(doanVien.ngaySinh).toLocaleDateString('vi-VN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {doanVien.gioiTinh === 0 ? 'Nam' : 'Nữ'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(doanVien.ngayVaoDoan).toLocaleDateString('vi-VN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{doanVien.queQuan}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doanVien.chucVu}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doanVien.chiDoan?.tenCD}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(doanVien)}
                    className="text-blue-600 hover:text-blue-900"
                    disabled={isLoading}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(doanVien.maDV)}
                    className="text-red-600 hover:text-red-900"
                    disabled={isLoading}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoanVienList; 