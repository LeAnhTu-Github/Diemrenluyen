import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import axios from "axios";

const RATING_OPTIONS = [
  { value: 1, label: "Hoàn thành xuất sắc nhiệm vụ" },
  { value: 2, label: "Hoàn thành tốt nhiệm vụ" },
  { value: 3, label: "Hoàn thành nhiệm vụ" },
  { value: 0, label: "Chưa đánh giá" },
];

export default function DanhGiaModal({ doanVien, onClose }) {
  const [form, setForm] = useState<{
    id?: string;
    strengths: string;
    weaknesses: string;
    reward: string;
    discipline: string;
    rating: number;
  }>({
    strengths: "",
    weaknesses: "",
    reward: "",
    discipline: "",
    rating: 0,
  });

  useEffect(() => {
    // fetch evaluation nếu đã có
    axios.get("/api/evaluations", { params: { userId: doanVien.maDV } })
      .then(res => {
        if (res.data && res.data.length > 0) setForm(res.data[0]);
      });
  }, [doanVien]);

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = async () => {
    if (form.id) {
      await axios.put("/api/evaluations", { id: form.id, ...form });
    } else {
      await axios.post("/api/evaluations", { ...form, userId: doanVien.maDV });
    }
    onClose();
  };

  return (
    <div className="modal">
      <h3>Đánh giá đoàn viên: {doanVien.hoDV} {doanVien.tenDV}</h3>
      <div>
        <label>Ưu điểm</label>
        <input value={form.strengths || ""} onChange={e => handleChange("strengths", e.target.value)} />
      </div>
      <div>
        <label>Khuyết điểm</label>
        <input value={form.weaknesses || ""} onChange={e => handleChange("weaknesses", e.target.value)} />
      </div>
      <div>
        <label>Khen thưởng</label>
        <input value={form.reward || ""} onChange={e => handleChange("reward", e.target.value)} />
      </div>
      <div>
        <label>Kỷ luật</label>
        <input value={form.discipline || ""} onChange={e => handleChange("discipline", e.target.value)} />
      </div>
      <div>
        <label>Đánh giá</label>
        <Select value={form.rating?.toString() || "0"} onValueChange={val => handleChange("rating", Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn đánh giá" />
          </SelectTrigger>
          <SelectContent>
            {RATING_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave}>Lưu</Button>
        <Button variant="outline" onClick={onClose}>Đóng</Button>
      </div>
    </div>
  );
}
