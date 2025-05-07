'use client';

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SafeDoanVien } from "@/app/types";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/inputs/Input";
import { Select } from "../ui/select";
import DatePicker from "@/app/components/inputs/DatePicker";

interface DoanVienModalProps {
  isOpen?: boolean;
  onClose: () => void;
  doanVien?: SafeDoanVien | null;
}

const DoanVienModal: React.FC<DoanVienModalProps> = ({
  isOpen,
  onClose,
  doanVien
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [chiDoans, setChiDoans] = useState<{ value: string; label: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      maDV: '',
      hoDV: '',
      tenDV: '',
      ngaySinh: new Date(),
      gioiTinh: 0,
      ngayVaoDoan: new Date(),
      queQuan: '',
      chucVu: '',
      maCD: ''
    }
  });

  useEffect(() => {
    // Fetch ChiDoan list for dropdown
    const fetchChiDoans = async () => {
      try {
        const response = await axios.get('/api/chidoan');
        const chiDoanOptions = response.data.map((chiDoan: any) => ({
          value: chiDoan.maCD,
          label: chiDoan.tenCD
        }));
        setChiDoans(chiDoanOptions);
      } catch (error) {
        console.error('Error fetching ChiDoan list:', error);
      }
    };
    fetchChiDoans();
  }, []);

  useEffect(() => {
    if (doanVien) {
      setValue('maDV', doanVien.maDV);
      setValue('hoDV', doanVien.hoDV);
      setValue('tenDV', doanVien.tenDV);
      setValue('ngaySinh', new Date(doanVien.ngaySinh));
      setValue('gioiTinh', doanVien.gioiTinh);
      setValue('ngayVaoDoan', new Date(doanVien.ngayVaoDoan));
      setValue('queQuan', doanVien.queQuan);
      setValue('chucVu', doanVien.chucVu);
      setValue('maCD', doanVien.maCD);
    }
  }, [doanVien, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      if (doanVien) {
        await axios.put('/api/doanvien', data);
        toast.success('Đoàn viên đã được cập nhật!');
      } else {
        await axios.post('/api/doanvien', data);
        toast.success('Đoàn viên đã được tạo!');
      }
      router.refresh();
      reset();
      onClose();
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="maDV"
        label="Mã Đoàn viên"
        disabled={isLoading || !!doanVien}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="hoDV"
        label="Họ"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="tenDV"
        label="Tên"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <DatePicker
        id="ngaySinh"
        label="Ngày sinh"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <DatePicker
        id="ngayVaoDoan"
        label="Ngày vào Đoàn"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="queQuan"
        label="Quê quán"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="chucVu"
        label="Chức vụ"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={doanVien ? "Chỉnh sửa Đoàn viên" : "Thêm Đoàn viên mới"}
      actionLabel={doanVien ? "Cập nhật" : "Tạo mới"}
      body={bodyContent}
    />
  );
};

export default DoanVienModal; 