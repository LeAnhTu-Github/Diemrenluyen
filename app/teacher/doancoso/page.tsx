"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import DoanCSModal from "./DoanCSModal";

type DoanCS = {
  id: string;
  maDCS: string;
  tenDCS: string;
  _count?: { chiDoans: number };
};

export default function DoanCSPage() {
  const [doanCSs, setDoanCSs] = useState<DoanCS[]>([]);
  const [selected, setSelected] = useState<DoanCS | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch data
  const fetchData = async () => {
    const res = await fetch("/api/doancoso");
    const data = await res.json();
    setDoanCSs(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle create/update
  const handleSave = async (values: Partial<DoanCS>) => {
    if (selected) {
      await fetch(`/api/doancoso/${selected.maDCS}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenDCS: values.tenDCS }),
      });
    } else {
      await fetch(`/api/doancoso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    }
    setOpen(false);
    setSelected(null);
    fetchData();
  };

  const handleDelete = async (maDCS: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá Đoàn Cơ Sở này?")) return;
    const res = await fetch(`/api/doancoso/${maDCS}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      fetchData();
    } else {
      alert(data.message || "Xoá thất bại");
    }
  };

  // Handle edit
  const handleEdit = (item: DoanCS) => {
    setSelected(item);
    setOpen(true);
  };

  // Handle create
  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách Đoàn Cơ Sở</h2>
        <Button onClick={handleCreate}>Thêm Đoàn Cơ Sở</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã ĐCS</TableHead>
            <TableHead>Tên ĐCS</TableHead>
            <TableHead>Số Chi Đoàn</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doanCSs.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.maDCS}</TableCell>
              <TableCell>{item.tenDCS}</TableCell>
              <TableCell>{item._count?.chiDoans ?? 0}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEdit(item)}>
                  Sửa
                </Button>
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => handleDelete(item.maDCS)}
                >
                  Xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DoanCSModal
        open={open}
        onClose={() => { setOpen(false); setSelected(null); }}
        onSave={handleSave}
        initialData={selected}
      />
    </div>
  );
}
