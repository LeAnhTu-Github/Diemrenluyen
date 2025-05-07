'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DoanVien } from "@prisma/client";
import { SafeDoanVien } from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import DoanVienList from "./DoanVienList";
import DoanVienModal from "./DoanVienModal";

interface DoanVienClientProps {
  doanViens: SafeDoanVien[];
}

const DoanVienClient: React.FC<DoanVienClientProps> = ({
  doanViens,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoanVien, setSelectedDoanVien] = useState<SafeDoanVien | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onOpenModal = (doanVien?: SafeDoanVien) => {
    setSelectedDoanVien(doanVien || null);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setSelectedDoanVien(null);
    setIsModalOpen(false);
  };

  const onDelete = async (maDV: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/doanvien?maDV=${maDV}`);
      toast.success('Đoàn viên đã được xóa!');
      router.refresh();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa đoàn viên.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Heading
            title="Quản lý Đoàn viên"
            subtitle="Danh sách đoàn viên trong hệ thống"
          />
          <button
            onClick={() => onOpenModal()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Thêm Đoàn viên
          </button>
        </div>
        <DoanVienList
          doanViens={doanViens}
          onEdit={onOpenModal}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      </div>
      <DoanVienModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        doanVien={selectedDoanVien}
      />
    </Container>
  );
};

export default DoanVienClient; 