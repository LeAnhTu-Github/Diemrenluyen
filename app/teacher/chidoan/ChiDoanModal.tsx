"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

type ChiDoan = {
  id?: string;
  maCD: string;
  tenCD: string; 
  maDCS: string;
};

interface ChiDoanModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: Partial<ChiDoan>) => void;
  initialData?: ChiDoan | null;
  doanCSList: Array<{ maDCS: string; tenDCS: string }>;
}

const ChiDoanModal: React.FC<ChiDoanModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  doanCSList,
}) => {
  const [maCD, setMaCD] = useState("");
  const [tenCD, setTenCD] = useState("");
  const [maDCS, setMaDCS] = useState("");

  useEffect(() => {
    setMaCD(initialData?.maCD || "");
    setTenCD(initialData?.tenCD || "");
    setMaDCS(initialData?.maDCS || "");
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ maCD, tenCD, maDCS });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white !bg-opacity-100 border border-gray-200 shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {initialData ? "Sửa Chi Đoàn" : "Thêm Chi Đoàn"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="maCD" className="block text-sm font-medium text-gray-700">
              Mã Chi Đoàn
            </label>
            <Input
              id="maCD"
              value={maCD}
              onChange={(e) => setMaCD(e.target.value)}
              required
              disabled={!!initialData}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tenCD" className="block text-sm font-medium text-gray-700">
              Tên Chi Đoàn
            </label>
            <Input
              id="tenCD"
              value={tenCD}
              onChange={(e) => setTenCD(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="maDCS" className="block text-sm font-medium text-gray-700">
              Đoàn Cơ Sở
            </label>
            <Select
              value={maDCS}
              onValueChange={setMaDCS}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn Đoàn Cơ Sở" />
              </SelectTrigger>
              <SelectContent className="bg-white !bg-opacity-100 border border-gray-200">
                {doanCSList.map((doanCS) => (
                  <SelectItem key={doanCS.maDCS} value={doanCS.maDCS}>
                    {doanCS.tenDCS}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {initialData ? "Lưu" : "Tạo mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChiDoanModal;