import React from "react";
import { CiSearch } from "react-icons/ci";
const NavStatic = () => {
  return (
    <div className="w-full h-[52px] flex justify-between">
      <div className="w-1/2 h-full p-2 rounded-2xl bg-[#F1F3F5] flex gap-2">
        <div className="w-1/4 h-full flex justify-center items-center text-[#9297A1] text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]">
          Tất cả
        </div>
        <div className="w-1/4 h-full flex justify-center items-center text-[#9297A1] text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]">
          Đăng kí
        </div>
        <div className="w-1/4 h-full flex justify-center items-center text-[#9297A1] text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]">
          Đã tham gia
        </div>
        <div className="w-1/4 h-full flex justify-center items-center text-[#9297A1] text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]">
          Sắp diễn ra
        </div>
      </div>

      <label className="input input-bordered flex items-center gap-2 rounded-xl border">
        <CiSearch size={30} className="fill-[#9297A1]" />
        <input type="text" className="grow" placeholder="Tìm kiếm" />
      </label>
    </div>
  );
};

export default NavStatic;
