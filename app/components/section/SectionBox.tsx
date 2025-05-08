import React from "react";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";

const SectionBox = () => {
  return (
    <div className="w-[35%] h-full bg-white p-5 rounded-3xl bg-noti bg-auto bg-center bg-repeat flex flex-col justify-end">
      <p className="text-white font-semibold text-2xl mb-4">Thông tin hoạt động</p>
      <div className="space-y-3">
        <div className="w-full h-[40px] bg-white/90 backdrop-blur-sm rounded-xl flex items-center p-4 gap-3">
          <IoCalendarOutline size={20} className="text-indigo-600" />
          <p className="font-medium text-gray-700">Học kỳ: 2024-2025</p>
        </div>
        <div className="w-full h-[40px] bg-white/90 backdrop-blur-sm rounded-xl flex items-center p-4 gap-3">
          <IoTimeOutline size={20} className="text-indigo-600" />
          <p className="font-medium text-gray-700">Thời gian: 15/3 - 15/5/2025</p>
        </div>
      </div>
    </div>
  );
};

export default SectionBox;
