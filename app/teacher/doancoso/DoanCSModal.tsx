"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type DoanCS = {
  id?: string;
  maDCS: string;
  tenDCS: string;
};

interface DoanCSModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: Partial<DoanCS>) => void;
  initialData?: DoanCS | null;
}

const DoanCSModal: React.FC<DoanCSModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [maDCS, setMaDCS] = useState("");
  const [tenDCS, setTenDCS] = useState("");

  useEffect(() => {
    setMaDCS(initialData?.maDCS || "");
    setTenDCS(initialData?.tenDCS || "");
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ maDCS, tenDCS });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white border border-gray-200 shadow-lg rounded-lg"
        style={{ backgroundColor: 'white' }}
      >
        <DialogHeader>
          <DialogTitle>{initialData ? "Sửa Đoàn Cơ Sở" : "Thêm Đoàn Cơ Sở"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="maDCS" className="block text-sm font-medium text-gray-700">
              Mã ĐCS
            </label>
            <Input
              id="maDCS"
              value={maDCS}
              onChange={(e) => setMaDCS(e.target.value)}
              required
              disabled={!!initialData}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tenDCS" className="block text-sm font-medium text-gray-700">
              Tên ĐCS
            </label>
            <Input
              id="tenDCS"
              value={tenDCS}
              onChange={(e) => setTenDCS(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default DoanCSModal;
