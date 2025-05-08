'use client'
import { useState, useEffect } from "react";

interface DoanVienListProps {
  chiDoanId: string;
  onDanhGia: (dv: any) => void;
}

export default function DoanVienList({ chiDoanId, onDanhGia }: DoanVienListProps) {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (chiDoanId)
      fetch(`/api/doanvien?maCD=${chiDoanId}`).then(res => res.json()).then(setList);
  }, [chiDoanId]);
  return (
    <table>
      <thead>
        <tr>
          <th>STT</th><th>Họ tên</th><th>Ngày sinh</th><th>Chức vụ</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((dv, idx) => (
          <tr key={dv.maDV}>
            <td>{idx + 1}</td>
            <td>{dv.hoDV} {dv.tenDV}</td>
            <td>{new Date(dv.ngaySinh).toLocaleDateString("vi-VN")}</td>
            <td>{dv.chucVu}</td>
            <td>
              <button onClick={() => onDanhGia(dv)} className="btn btn-primary">Đánh giá</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}