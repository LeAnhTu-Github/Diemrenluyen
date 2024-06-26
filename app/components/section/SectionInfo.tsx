import React from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
// import { SafeUser } from "@/app/types";
interface SidebarProps {
  currentUser?: SafeUser | null;
}
const SectionInfo = ({ currentUser }: SidebarProps) => {
  return (
    <div className="w-[65%] h-full bg-white p-5 rounded-3xl flex flex-col">
      <div className="h-2/5 w-full flex gap-4 items-center">
        <div>
          <Avatar src={currentUser?.image} />
        </div>
        <div className="flex flex-col justify-start pt-2 gap-1">
          <p className=" text-sm font-bold text-{#06080F}">
            {currentUser?.name}
          </p>
          <p className=" text-xs font-semibold text-{#797D85} opacity-50">
            {currentUser?.email}
          </p>
        </div>
      </div>
      <div className="w-full h-1/2 flex gap-2 ">
        <div className="w-1/3 h-full bg-nav1 bg-auto bg-center bg-repeat rounded-[20px] p-2 flex flex-col">
          <p className="text-[#797D85] text-sm font-medium">
            Số hoạt động tham gia
          </p>
          <p className="text-[#06080F] text-2xl font-semibold pt-2">7</p>
        </div>
        <div className="w-1/3 h-full bg-nav2 bg-auto bg-center bg-repeat rounded-[20px] p-2  flex flex-col">
          <p className="text-[#797D85] text-sm font-medium">
            Số hoạt động đang đăng kí
          </p>
          <p className="text-[#06080F] text-2xl font-semibold pt-2">2</p>
        </div>
        <div className="w-1/3 h-full bg-nav3 bg-auto bg-center bg-repeat rounded-[20px] p-2  flex flex-col">
          <p className="text-[#797D85] text-sm font-medium">
            Tổng điểm tích luỹ
          </p>
          <p className="text-[#06080F] text-2xl font-semibold pt-2">84</p>
        </div>
      </div>
    </div>
  );
};

export default SectionInfo;
