'use client';

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/app/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/app/components/ui/select";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { ChiDoan, RenLuyen } from "@prisma/client";
import { SafeDoanVien } from "@/app/types";
import RenLuyenTableRow from "@/app/components/renluyen/RenLuyenTableRow";

type ChiDoanOption = Pick<ChiDoan, 'maCD' | 'tenCD'>;
type RenLuyenEntry = Pick<RenLuyen, 'diem' | 'xepLoai'>;
type RenLuyenDataMap = Record<string, RenLuyenEntry>;

const ALL = 'all';
const HOC_KY_LIST = [1,2,3,4,5,6,7,8];
const XEP_LOAI_OPTIONS = ['Xuất sắc','Tốt','Khá','Trung bình','Yếu','Kém'];

export default function RenLuyenPage() {
  const [chiDoans, setChiDoans] = useState<ChiDoanOption[]>([]);
  const [selectedMaCD, setSelectedMaCD] = useState<string>(ALL);
  const [selectedHocKy, setSelectedHocKy] = useState<string>(ALL);
  const [doanViens, setDoanViens] = useState<SafeDoanVien[]>([]);
  const [renLuyenData, setRenLuyenData] = useState<RenLuyenDataMap>({});
  const [isFetchingChiDoan, setIsFetchingChiDoan] = useState(true);
  const [isFetchingDoanVien, setIsFetchingDoanVien] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchChiDoans = useCallback(async () => {
    setIsFetchingChiDoan(true);
    try {
      const res = await axios.get<ChiDoanOption[]>('/api/chidoan');
      setChiDoans(res.data);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách Chi đoàn.");
      console.error(err);
    } finally {
      setIsFetchingChiDoan(false);
    }
  }, []);

  const fetchDoanVienData = useCallback(async () => {
    setIsFetchingDoanVien(true);
    try {
      const params: any = {};
      if (selectedMaCD !== ALL) params.maCD = selectedMaCD;
      if (selectedHocKy !== ALL) params.hocKy = selectedHocKy;
      const res = await axios.get('/api/doanvien', { params });
      setDoanViens(res.data.doanViens || []);
      setRenLuyenData(res.data.renLuyenMap || {});
    } catch (err) {
      toast.error("Lỗi khi tải danh sách Đoàn viên.");
      console.error(err);
      setDoanViens([]);
      setRenLuyenData({});
    } finally {
      setIsFetchingDoanVien(false);
    }
  }, [selectedMaCD, selectedHocKy]);

  useEffect(() => { fetchChiDoans(); }, [fetchChiDoans]);
  useEffect(() => { fetchDoanVienData(); }, [fetchDoanVienData]);

  const handleSaveRow = useCallback(async (maDV: string, diem: number|null, xepLoai: string) => {
    if (selectedHocKy === ALL) return;
    setIsSaving(true);
    try {
      await axios.put(`/api/doanvien/${maDV}/renluyen/${selectedHocKy}`, { diem, xepLoai: xepLoai||null });
      toast.success(`Đã lưu rèn luyện cho ${maDV} - HK ${selectedHocKy}`);
      setRenLuyenData(prev => ({ ...prev, [maDV]: { diem: diem??0, xepLoai } }));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Lỗi khi lưu.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }, [selectedHocKy]);

  const isLoading = isFetchingChiDoan || isFetchingDoanVien;

  return (
    <Container>
      <div className="p-4 space-y-6">
        <Heading title="Quản lý Rèn luyện" subtitle="Lọc Chi đoàn & Học kỳ" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded bg-gray-50">
          {/* Chi đoàn */}
          <div>
            <label className="block mb-1">Chi Đoàn</label>
            <Select value={selectedMaCD} onValueChange={setSelectedMaCD} disabled={isLoading||isSaving}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={ALL}
                  className="bg-gray-50"
                >
                  Tất cả Chi Đoàn
                </SelectItem>
                {chiDoans.map(cd => (
                  <SelectItem
                    key={cd.maCD}
                    value={cd.maCD}
                    className="bg-gray-50"
                  >
                    {cd.tenCD}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Học kỳ */}
          <div>
            <label className="block mb-1">Học Kỳ</label>
            <Select value={selectedHocKy} onValueChange={setSelectedHocKy} disabled={isLoading||isSaving}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={ALL}
                  className="bg-gray-50"
                >
                  Tất cả Học Kỳ
                </SelectItem>
                {HOC_KY_LIST.map(hk => (
                  <SelectItem
                    key={hk}
                    value={String(hk)}
                    className="bg-gray-50"
                  >
                    Học Kỳ {hk}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded shadow border">
          <h3 className="p-4 border-b font-semibold">
            Danh sách {selectedMaCD===ALL ? 'tất cả' : chiDoans.find(c=>c.maCD===selectedMaCD)?.tenCD}
            {selectedHocKy!==ALL && ` (HK ${selectedHocKy})`}
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Mã ĐV</TableHead>
                  <TableHead>Họ Tên</TableHead>
                  {selectedHocKy !== ALL && <TableHead>Điểm</TableHead>}
                  {selectedHocKy !== ALL && <TableHead>Xếp Loại</TableHead>}
                  {selectedHocKy !== ALL && <TableHead>Thao tác</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={selectedHocKy!==ALL ? 6 : 3} className="text-center py-6">
                      Đang tải...
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && doanViens.length===0 && (
                  <TableRow>
                    <TableCell colSpan={selectedHocKy!==ALL ? 6 : 3} className="text-center py-6">
                      Không có Đoàn viên.
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && doanViens.map((dv, idx) => (
                  <RenLuyenTableRow
                    key={dv.maDV}
                    stt={idx+1}
                    doanVien={dv}
                    initialDiem={renLuyenData[dv.maDV]?.diem ?? null}
                    initialXepLoai={renLuyenData[dv.maDV]?.xepLoai ?? ''}
                    xepLoaiOptions={XEP_LOAI_OPTIONS}
                    onSave={handleSaveRow}
                    isTableLoading={isSaving}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
}
