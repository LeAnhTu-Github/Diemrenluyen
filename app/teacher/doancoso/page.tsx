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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Đoàn Cơ Sở</h2>
        <Button 
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span className="text-lg">+</span>
          Thêm Đoàn Cơ Sở
        </Button>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-indigo-50">
              <TableHead className="font-semibold text-indigo-900 py-4">Mã ĐCS</TableHead>
              <TableHead className="font-semibold text-indigo-900 py-4">Tên ĐCS</TableHead>
              <TableHead className="font-semibold text-indigo-900 py-4">Số Chi Đoàn</TableHead>
              <TableHead className="font-semibold text-indigo-900 py-4 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doanCSs.map((item) => (
              <TableRow 
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
              >
                <TableCell className="py-4 font-medium text-gray-900">{item.maDCS}</TableCell>
                <TableCell className="py-4 text-gray-700">{item.tenDCS}</TableCell>
                <TableCell className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {item._count?.chiDoans ?? 0} Chi đoàn
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 px-3 py-1"
                    >
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Sửa
                      </span>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.maDCS)}
                      className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200 px-3 py-1"
                    >
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Xoá
                      </span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DoanCSModal
        open={open}
        onClose={() => { setOpen(false); setSelected(null); }}
        onSave={handleSave}
        initialData={selected}
      />
    </div>
  );
}