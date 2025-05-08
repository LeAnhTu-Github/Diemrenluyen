"use client";
import React, { useState, useEffect } from "react";
import ChiDoanModal from "./ChiDoanModal";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { toast } from "react-hot-toast";
import axios from "axios";

interface ChiDoan {
  maCD: string;
  tenCD: string;
  maDCS: string;
  doanCS?: {
    tenDCS: string;
  };
}

const ChiDoanPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChiDoan, setSelectedChiDoan] = useState<ChiDoan | null>(null);
  const [chiDoanList, setChiDoanList] = useState<ChiDoan[]>([]);
  const [doanCSList, setDoanCSList] = useState<Array<{ maDCS: string; tenDCS: string }>>([]);

  // Fetch danh sách Chi Đoàn
  const fetchChiDoanList = async () => {
    try {
      const { data } = await axios.get("/api/chidoan");
      setChiDoanList(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tải danh sách Chi Đoàn");
    }
  };

  // Fetch danh sách Đoàn Cơ Sở
  const fetchDoanCSList = async () => {
    try {
      const { data } = await axios.get("/api/doancoso");
      setDoanCSList(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tải danh sách Đoàn Cơ Sở");
    }
  };

  useEffect(() => {
    fetchChiDoanList();
    fetchDoanCSList();
  }, []);

  const handleOpenModal = (chiDoan?: ChiDoan) => {
    setSelectedChiDoan(chiDoan || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedChiDoan(null);
    setIsModalOpen(false);
  };

  const handleSave = async (values: Partial<ChiDoan>) => {
    try {
      if (selectedChiDoan) {
        await axios.put(`/api/chidoan/${selectedChiDoan.maCD}`, {
          tenCD: values.tenCD,
          maDCS: values.maDCS,
        });
        toast.success("Cập nhật Chi Đoàn thành công");
      } else {
        await axios.post("/api/chidoan", {
          maCD: values.maCD,
          tenCD: values.tenCD,
          maDCS: values.maDCS,
        });
        toast.success("Thêm Chi Đoàn mới thành công");
      }
      
      await fetchChiDoanList();
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (maCD: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa Chi Đoàn này?")) return;

    try {
      await axios.delete(`/api/chidoan/${maCD}`);
      await fetchChiDoanList();
      toast.success("Xóa Chi Đoàn thành công");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Chi Đoàn</h2>
        <Button 
          onClick={() => handleOpenModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <span className="text-lg">+</span>
          Thêm Chi Đoàn
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-indigo-50">
              <TableHead className="font-semibold text-indigo-900 py-4">Mã Chi Đoàn</TableHead>
              <TableHead className="font-semibold text-indigo-900 py-4">Tên Chi Đoàn</TableHead>
              <TableHead className="font-semibold text-indigo-900 py-4">Đoàn Cơ Sở</TableHead>
              <TableHead className="font-semibold text-indigo-900 py-4 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chiDoanList.map((chiDoan) => (
              <TableRow 
                key={chiDoan.maCD}
                className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
              >
                <TableCell className="py-4 font-medium text-gray-900">{chiDoan.maCD}</TableCell>
                <TableCell className="py-4 text-gray-700">{chiDoan.tenCD}</TableCell>
                <TableCell className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {chiDoan.doanCS?.tenDCS}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleOpenModal(chiDoan)}
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
                      onClick={() => handleDelete(chiDoan.maCD)}
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

      <ChiDoanModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={selectedChiDoan}
        doanCSList={doanCSList}
      />
    </div>
  );
};

export default ChiDoanPage;
