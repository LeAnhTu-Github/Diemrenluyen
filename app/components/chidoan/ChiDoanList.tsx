import { useState, useEffect } from "react";

// Hiển thị danh sách chi đoàn theo đoàn cơ sở
export default function ChiDoanList({ doanCoSoId, onSelect }) {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    if (doanCoSoId)
      fetch(`/api/chidoan?maDCS=${doanCoSoId}`).then(res => res.json()).then(setList);
  }, [doanCoSoId]);
  return (
    <div>
      <h4>Chọn Chi đoàn:</h4>
      {list.map(cd => (
        <button key={cd.maCD} onClick={() => onSelect(cd.maCD)} className="btn">
          {cd.tenCD}
        </button>
      ))}
    </div>
  );
}
