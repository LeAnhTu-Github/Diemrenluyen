'use client';

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import RenLuyenTableRow from "@/app/components/renluyen/RenLuyenTableRow";
import { ChiDoan, RenLuyen } from "@prisma/client";
import { SafeDoanVien } from "@/app/types";

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
  const [isFetchingChi, setIsFetchingChi] = useState(true);
  const [isFetchingDV, setIsFetchingDV] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchChiDoans = useCallback(async () => {
    setIsFetchingChi(true);
    try {
      const res = await axios.get<ChiDoanOption[]>('/api/chidoan');
      setChiDoans(res.data);
    } catch {
      toast.error("Lỗi tải Chi đoàn");
    } finally {
      setIsFetchingChi(false);
    }
  }, []);

  const fetchDoanViens = useCallback(async () => {
    setIsFetchingDV(true);
    try {
      const params: any = {};
      if (selectedMaCD !== ALL) params.maCD = selectedMaCD;
      if (selectedHocKy !== ALL) params.hocKy = selectedHocKy;
      const res = await axios.get('/api/doanvien', { params });
      setDoanViens(res.data.doanViens || []);
      setRenLuyenData(res.data.renLuyenMap || {});
    } catch {
      toast.error("Lỗi tải Đoàn viên");
    } finally {
      setIsFetchingDV(false);
    }
  }, [selectedMaCD, selectedHocKy]);

  useEffect(() => { fetchChiDoans(); }, [fetchChiDoans]);
  useEffect(() => { fetchDoanViens(); }, [fetchDoanViens]);

  const handleSaveRow = useCallback(async (maDV: string, diem: number|null, xepLoai: string) => {
    if (selectedHocKy === ALL) return;
    setIsSaving(true);
    try {
      await axios.put(`/api/doanvien/${maDV}/renluyen/${selectedHocKy}`, { diem, xepLoai });
      setRenLuyenData(prev => ({ ...prev, [maDV]: { diem: diem ?? 0, xepLoai } }));
      toast.success("Lưu thành công");
    } catch {
      toast.error("Lỗi lưu");
    } finally {
      setIsSaving(false);
    }
  }, [selectedHocKy]);

  const isLoading = isFetchingChi || isFetchingDV;

  return (
    <Container>
      <div className="p-6 space-y-6">
        <Heading title="Quản lý Rèn luyện" subtitle="Lọc Chi đoàn & Học kỳ" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded bg-gray-50">
          <div>
            <label className="block mb-1">Chi Đoàn</label>
            <Select value={selectedMaCD} onValueChange={setSelectedMaCD} disabled={isLoading||isSaving}>
              <SelectTrigger className="w-full"><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>— Tất cả —</SelectItem>
                {chiDoans.map(c=> <SelectItem key={c.maCD} value={c.maCD}>{c.tenCD}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1">Học Kỳ</label>
            <Select value={selectedHocKy} onValueChange={setSelectedHocKy} disabled={isLoading||isSaving}>
              <SelectTrigger className="w-full"><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>— Tất cả —</SelectItem>
                {HOC_KY_LIST.map(hk=> <SelectItem key={hk} value={String(hk)}>Học Kỳ {hk}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded shadow border">
          <h3 className="p-4 border-b font-semibold">
            Danh sách {selectedMaCD===ALL ? 'tất cả Chi đoàn' : chiDoans.find(c=>c.maCD===selectedMaCD)?.tenCD}
            {selectedHocKy!==ALL && ` — HK ${selectedHocKy}`}
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Mã ĐV</TableHead>
                  <TableHead>Họ Tên</TableHead>
                  {selectedHocKy!==ALL && <TableHead>Điểm</TableHead>}
                  {selectedHocKy!==ALL && <TableHead>Xếp Loại</TableHead>}
                  {selectedHocKy!==ALL && <TableHead>Thao tác</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={selectedHocKy!==ALL ? 6 : 3} className="text-center py-6">Đang tải...</TableCell>
                  </TableRow>
                )}
                {!isLoading && doanViens.length===0 && (
                  <TableRow>
                    <TableCell colSpan={selectedHocKy!==ALL ? 6 : 3} className="text-center py-6">Không có Đoàn viên.</TableCell>
                  </TableRow>
                )}
                {!isLoading && doanViens.map((dv,i)=>(
                  <RenLuyenTableRow
                    key={dv.maDV}
                    stt={i+1}
                    doanVien={dv}
                    initialDiem={renLuyenData[dv.maDV]?.diem ?? null}
                    initialXepLoai={renLuyenData[dv.maDV]?.xepLoai ?? ''}
                    xepLoaiOptions={XEP_LOAI_OPTIONS}
                    onSave={handleSaveRow}
                    isTableLoading={isSaving}
                    hideRen={selectedHocKy===ALL}
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
