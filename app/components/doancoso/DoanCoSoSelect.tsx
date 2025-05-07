import { useState, useEffect } from "react";

// Chọn đoàn cơ sở
export default function DoanCoSoSelect({ onSelect }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    // fetch danh sách đoàn cơ sở
    fetch("/api/doancoso").then(res => res.json()).then(setList);
  }, []);
  return (
    <select onChange={e => onSelect(e.target.value)}>
      <option value="">Chọn Đoàn cơ sở</option>
      {list.map((dcs: { maDCS: string; tenDCS: string }) => (
        <option key={dcs.maDCS} value={dcs.maDCS}>{dcs.tenDCS}</option>
      ))}
    </select>
  );
}
