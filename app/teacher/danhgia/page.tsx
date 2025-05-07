"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import axios from "axios";

const RATING_OPTIONS = [
  { value: 1, label: "Hoàn thành xuất sắc nhiệm vụ" },
  { value: 2, label: "Hoàn thành tốt nhiệm vụ" },
  { value: 3, label: "Hoàn thành nhiệm vụ" },
  { value: 0, label: "Chưa đánh giá" },
];

export default function EvaluationTable({ doanViens, year, semester }) {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!year) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/evaluations", { params: { year, semester } });
        setEvaluations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setEvaluations([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [year, semester]);

  const handleChange = (maDV, field, value) => {
    setEvaluations((prev) =>
      prev.map((ev) =>
        ev.userId === maDV ? { ...ev, [field]: value } : ev
      )
    );
  };

  const handleSave = async (maDV) => {
    const ev = evaluations.find((e) => e.userId === maDV);
    if (ev.id) {
      await axios.put("/api/evaluations", { id: ev.id, ...ev });
    } else {
      await axios.post("/api/evaluations", { ...ev, userId: maDV, year, semester });
    }
    // Optionally: refetch or show toast
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Ưu điểm</th>
            <th>Khuyết điểm</th>
            <th>Khen thưởng</th>
            <th>Kỷ luật</th>
            <th>Đánh giá</th>
            <th>Lưu</th>
          </tr>
        </thead>
        <tbody>
          {(doanViens || []).map((dv, idx) => {
            const ev = evaluations.find((e) => e.userId === dv.maDV) || {};
            return (
              <tr key={dv.maDV}>
                <td>{idx + 1}</td>
                <td>{dv.hoDV} {dv.tenDV}</td>
                <td>
                  <input
                    className="input"
                    value={ev.strengths || ""}
                    onChange={e => handleChange(dv.maDV, "strengths", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    value={ev.weaknesses || ""}
                    onChange={e => handleChange(dv.maDV, "weaknesses", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    value={ev.reward || ""}
                    onChange={e => handleChange(dv.maDV, "reward", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    value={ev.discipline || ""}
                    onChange={e => handleChange(dv.maDV, "discipline", e.target.value)}
                  />
                </td>
                <td>
                  <Select
                    value={ev.rating?.toString() || "0"}
                    onValueChange={val => handleChange(dv.maDV, "rating", Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đánh giá" />
                    </SelectTrigger>
                    <SelectContent>
                      {RATING_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value.toString()}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td>
                  <Button onClick={() => handleSave(dv.maDV)} size="sm">Lưu</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}