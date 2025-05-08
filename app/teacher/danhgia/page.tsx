"use client";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const RATING_OPTIONS = [
  { value: 1, label: "Hoàn thành xuất sắc nhiệm vụ" },
  { value: 2, label: "Hoàn thành tốt nhiệm vụ" },
  { value: 3, label: "Hoàn thành nhiệm vụ" },
  { value: 0, label: "Chưa đánh giá" },
];

const SEMESTER_OPTIONS = [
  { value: 1, label: "Học kỳ 1" },
  { value: 2, label: "Học kỳ 2" },
  { value: 3, label: "Học kỳ 3" },
  { value: 4, label: "Học kỳ 4" },
  { value: 5, label: "Học kỳ 5" },
  { value: 6, label: "Học kỳ 6" },
  { value: 7, label: "Học kỳ 7" },
  { value: 8, label: "Học kỳ 8" },
];

const evaluationSchema = z.object({
  maDV: z.string(),
  semester: z.number(),
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  reward: z.string().optional(),
  discipline: z.string().optional(),
  rating: z.number().optional(),
});

// Main DanhGiaPage Component
export default function DanhGiaPage() {
  const [doanCoSoList, setDoanCoSoList] = useState<any[]>([]);
  const [chiDoanList, setChiDoanList] = useState<any[]>([]);
  const [selectedDCS, setSelectedDCS] = useState<string | null>(null);
  const [selectedCD, setSelectedCD] = useState<string | null>(null);
  const [selectedDV, setSelectedDV] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchMaDV, setSearchMaDV] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  useEffect(() => {
    fetch("/api/doancoso").then(res => res.json()).then(setDoanCoSoList);
  }, []);

  useEffect(() => {
    if (selectedDCS) {
      fetch(`/api/chidoan?maDCS=${selectedDCS}`).then(res => res.json()).then(setChiDoanList);
      setSelectedCD(null);
    }
  }, [selectedDCS]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-in-out;
      }
      .custom-select-trigger {
        padding: 12px 16px !important;
        font-size: 1.125rem !important;
        line-height: 1.75rem !important;
        height: 48px !important;
        border-radius: 8px !important;
        border: 1px solid #d1d5db !important;
        background-color: #ffffff !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
        transition: all 0.2s ease-in-out !important;
      }
      .custom-select-trigger:hover {
        border-color: #6366f1 !important;
        box-shadow: 0 0 0 1px #6366f1 !important;
      }
      .custom-select-trigger:focus {
        outline: none !important;
        border-color: #4f46e5 !important;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3) !important;
      }
      .custom-select-content {
        border-radius: 8px !important;
        border: 1px solid #d1d5db !important;
        background-color: #ffffff !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        padding: 8px 0 !important;
      }
      .custom-select-item {
        padding: 12px 16px !important;
        font-size: 1.125rem !important;
        line-height: 1.75rem !important;
        cursor: pointer !important;
        transition: background-color 0.2s ease-in-out !important;
      }
      .custom-select-item:hover {
        background-color: #f3f4f6 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <Toaster position="top-right" />
      
      {/* Search Inputs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Tìm theo mã:</label>
            <input
              type="text"
              value={searchMaDV}
              onChange={(e) => setSearchMaDV(e.target.value)}
              placeholder="Nhập mã đoàn viên..."
              className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">Tìm theo học kỳ:</label>
            <Select
              value={selectedSemester.toString()}
              onValueChange={(val) => setSelectedSemester(Number(val))}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Chọn học kỳ" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {SEMESTER_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Đánh Giá Đoàn Viên</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DoanCoSoSelect onSelect={setSelectedDCS} value={selectedDCS} />
            <ChiDoanList doanCoSoId={selectedDCS} onSelect={setSelectedCD} value={selectedCD} />
          </div>
          {selectedCD && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Chọn học kỳ:</h3>
              <RadioGroup
                value={selectedSemester.toString()}
                onValueChange={(value) => setSelectedSemester(Number(value))}
                className="grid grid-cols-4 gap-4"
              >
                {SEMESTER_OPTIONS.map((semester) => (
                  <div key={semester.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={semester.value.toString()}
                      id={`semester-${semester.value}`}
                      className="border-indigo-500 text-indigo-500"
                    />
                    <Label
                      htmlFor={`semester-${semester.value}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {semester.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          {selectedCD && (
            <div className="mt-6 animate-fade-in">
              <DoanVienList 
                chiDoanId={selectedCD} 
                onDanhGia={dv => { setSelectedDV(dv); setModalOpen(true); }}
                selectedSemester={selectedSemester}
              />
            </div>
          )}
          {modalOpen && selectedDV && (
            <DanhGiaModal 
              doanVien={selectedDV} 
              onClose={() => setModalOpen(false)}
              semester={selectedSemester}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// DoanCoSoSelect Component
function DoanCoSoSelect({ onSelect, value }) {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/doancoso").then(res => res.json()).then(setList);
  }, []);
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">Đoàn Cơ Sở</label>
      <Select value={value || ""} onValueChange={onSelect}>
        <SelectTrigger className="custom-select-trigger">
          <SelectValue placeholder="Chọn Đoàn cơ sở" />
        </SelectTrigger>
        <SelectContent className="custom-select-content">
          {list.map(dcs => (
            <SelectItem key={dcs.maDCS} value={dcs.maDCS} className="custom-select-item">{dcs.tenDCS}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ChiDoanList Component
function ChiDoanList({ doanCoSoId, onSelect, value }) {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (doanCoSoId) {
      fetch(`/api/chidoan?maDCS=${doanCoSoId}`).then(res => res.json()).then(setList);
    }
  }, [doanCoSoId]);
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">Chi Đoàn</label>
      <Select value={value || ""} onValueChange={onSelect} disabled={!doanCoSoId}>
        <SelectTrigger className="custom-select-trigger">
          <SelectValue placeholder="Chọn Chi đoàn" />
        </SelectTrigger>
        <SelectContent className="custom-select-content">
          {list.map(cd => (
            <SelectItem key={cd.maCD} value={cd.maCD} className="custom-select-item">{cd.tenCD}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// DoanVienList Component
function DoanVienList({ 
  chiDoanId, 
  onDanhGia,
  selectedSemester
}: { 
  chiDoanId: string; 
  onDanhGia: (dv: any) => void;
  selectedSemester: number;
}) {
  const [list, setList] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<Record<string, any>>({});

  // Fetch doan vien list
  useEffect(() => {
    if (chiDoanId) {
      fetch(`/api/doanvien?maCD=${chiDoanId}`).then(res => res.json()).then(setList);
    }
  }, [chiDoanId]);

  // Fetch evaluations for selected semester
  useEffect(() => {
    if (list.length > 0) {
      const fetchEvaluations = async () => {
        const evaluationMap: Record<string, any> = {};
        try {
          const params = new URLSearchParams({
            semester: selectedSemester.toString()
          });
          
          const res = await fetch(`/api/evaluations?${params}`);
          const data = await res.json();
          
          if (data && data.length > 0) {
            data.forEach((evaluation: any) => {
              evaluationMap[evaluation.maDV] = evaluation;
            });
          }
          setEvaluations(evaluationMap);
        } catch (error) {
          console.error("Error fetching evaluations:", error);
        }
      };
      fetchEvaluations();
    }
  }, [list, selectedSemester]);

  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-indigo-700">
          Học kỳ {selectedSemester} - Danh sách đoàn viên
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 text-left w-12">STT</th>
              <th className="p-2 text-left w-24">Mã ĐV</th>
              <th className="p-2 text-left w-40">Họ Tên</th>
              <th className="p-2 text-left w-28">Ngày Sinh</th>
              <th className="p-2 text-left w-32">Chức Vụ</th>
              <th className="p-2 text-left w-64">Trạng thái</th>
              <th className="p-2 text-left w-28">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((dv, idx) => {
              const evaluation = evaluations[dv.maDV];
              const isEvaluated = !!evaluation;
              const rating = evaluation?.rating;

              return (
                <tr key={dv.maDV} className="border-b hover:bg-gray-50">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2 font-medium">{dv.maDV}</td>
                  <td className="p-2 truncate max-w-[160px]">{dv.hoDV} {dv.tenDV}</td>
                  <td className="p-2">{new Date(dv.ngaySinh).toLocaleDateString("vi-VN")}</td>
                  <td className="p-2">{dv.chucVu}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        isEvaluated ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm whitespace-normal">
                        {isEvaluated 
                          ? RATING_OPTIONS.find(opt => opt.value === rating)?.label || 'Đã đánh giá'
                          : 'Chưa đánh giá'}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <Button
                      onClick={() => onDanhGia(dv)}
                      className={`${
                        isEvaluated 
                          ? 'bg-yellow-500 hover:bg-yellow-600' 
                          : 'bg-indigo-500 hover:bg-indigo-600'
                      } text-white text-xs py-1 px-2`}
                    >
                      {isEvaluated ? 'Cập nhật' : 'Đánh Giá'}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">Đã đánh giá: {Object.keys(evaluations).length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm">Chưa đánh giá: {list.length - Object.keys(evaluations).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// DanhGiaModal Component
function DanhGiaModal({ doanVien, onClose, semester }) {
  const [form, setForm] = useState<{
    id?: string;
    semester: number;
    strengths: string;
    weaknesses: string;
    reward: string;
    discipline: string;
    rating: number;
  }>({
    semester: semester,
    strengths: "",
    weaknesses: "",
    reward: "",
    discipline: "",
    rating: 0,
  });

  useEffect(() => {
    axios.get("/api/evaluations", { 
      params: { 
        maDV: doanVien.maDV, 
        semester: semester 
      } 
    }).then(res => {
      if (res.data) setForm(prev => ({ ...prev, ...res.data }));
    });
  }, [doanVien, semester]);

  const handleChange = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        maDV: doanVien.maDV,
      };
      if (form.id) {
        await axios.put("/api/evaluations", { id: form.id, ...payload });
        toast.success('Đã cập nhật đánh giá thành công!', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
      } else {
        await axios.post("/api/evaluations", payload);
        toast.success('Đã thêm đánh giá thành công!', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving evaluation:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi lưu đánh giá', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-xl transform transition-all">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Đánh Giá: {doanVien.hoDV} {doanVien.tenDV}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Học Kỳ</label>
            <Select
              value={form.semester?.toString() || "1"}
              onValueChange={val => handleChange("semester", Number(val))}
            >
              <SelectTrigger className="custom-select-trigger">
                <SelectValue placeholder="Chọn học kỳ" />
              </SelectTrigger>
              <SelectContent className="custom-select-content">
                {SEMESTER_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value.toString()} className="custom-select-item">{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Ưu Điểm</label>
            <input
              value={form.strengths || ""}
              onChange={e => handleChange("strengths", e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-base"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Khuyết Điểm</label>
            <input
              value={form.weaknesses || ""}
              onChange={e => handleChange("weaknesses", e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-base"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Khen Thưởng</label>
            <input
              value={form.reward || ""}
              onChange={e => handleChange("reward", e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-base"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Kỷ Luật</label>
            <input
              value={form.discipline || ""}
              onChange={e => handleChange("discipline", e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-base"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Đánh Giá</label>
            <Select
              value={form.rating?.toString() || "0"}
              onValueChange={val => handleChange("rating", Number(val))}
            >
              <SelectTrigger className="custom-select-trigger">
                <SelectValue placeholder="Chọn đánh giá" />
              </SelectTrigger>
              <SelectContent className="custom-select-content">
                {RATING_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value.toString()} className="custom-select-item">{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button
            onClick={handleSave}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg py-2 px-6"
          >
            Lưu
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 text-lg py-2 px-6"
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}