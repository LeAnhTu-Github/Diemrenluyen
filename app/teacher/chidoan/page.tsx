"use client";
import React, { useState, useEffect } from "react";
import ChiDoanModal from "./ChiDoanModal";
import { Button } from "@/app/components/ui/button";
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
        // Sửa Chi Đoàn
        const { data } = await axios.put(`/api/chidoan/${selectedChiDoan.maCD}`, {
          tenCD: values.tenCD,
          maDCS: values.maDCS,
        });
        toast.success("Cập nhật Chi Đoàn thành công");
      } else {
        // Thêm mới Chi Đoàn
        const { data } = await axios.post("/api/chidoan", {
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Chi Đoàn</h1>
        <Button onClick={() => handleOpenModal()}>Thêm Chi Đoàn mới</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã Chi Đoàn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Chi Đoàn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đoàn Cơ Sở
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chiDoanList.map((chiDoan) => (
              <tr key={chiDoan.maCD}>
                <td className="px-6 py-4 whitespace-nowrap">{chiDoan.maCD}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chiDoan.tenCD}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {chiDoan.doanCS?.tenDCS}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleOpenModal(chiDoan)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(chiDoan.maCD)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
