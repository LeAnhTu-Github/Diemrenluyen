"use client";
import React from "react";
import { FaHome } from "react-icons/fa";
import { Tb3DCubeSphere } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdPayment, MdOutlinePayments } from "react-icons/md";
import { RiQuestionnaireLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { SafeUser } from "@/app/types";
interface SidebarProps {
  currentUser?: SafeUser | null;
}
const SideDashboard = ({ currentUser }: SidebarProps) => {
  const pathname = usePathname();
  let checkHome;
  let checkPoit;
  switch (pathname) {
    case "/":
      checkHome = true;
      break;
    case "/Point":
      checkPoit = true;
      break;
    default:
      checkHome = false;
      checkPoit = false;
  }
  return (
    <div>
      <div className="bg-white w-full h-[336px] px-6 py-4">
        <div
          className={`w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 
            ${checkHome ? "bg-[#EFF6FF]" : "bg-white"}
          `}
        >
          <FaHome
            size={20}
            className={`${checkHome ? "fill-[#3D8AFF]" : "fill-[#797D85]"}`}
          />
          <p
            className={`text-base ${
              checkHome ? "text-[#3D8AFF]" : "text-[#797D85]"
            } font-medium pl-4`}
          >
            Trang chủ
          </p>
        </div>
        <div className="w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 ">
          <Tb3DCubeSphere size={20} className="fill-[#797D85]" />
          <p className="text-base text-[#797D85] font-medium pl-4">Sự Kiện</p>
        </div>
        <div className="w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 ">
          <CiUser size={20} className="fill-[#797D85]" />
          <p className="text-base text-[#797D85] font-medium pl-4">Thông tin</p>
        </div>
        <div
          className={`w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 
        ${checkPoit ? "bg-[#EFF6FF]" : "bg-white"}`}
        >
          <MdPayment
            size={20}
            className={`${checkPoit ? "fill-[#3D8AFF]" : "fill-[#797D85]"}`}
          />
          <p
            className={`text-base ${
              checkPoit ? "text-[#3D8AFF]" : "text-[#797D85]"
            } font-medium pl-4`}
          >
            Điểm rèn luyện
          </p>
        </div>
        <div className="w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 ">
          <RiQuestionnaireLine size={20} className="fill-[#797D85]" />
          <p className="text-base text-[#797D85] font-medium pl-4">Câu hỏi</p>
        </div>
      </div>
    </div>
  );
};

export default SideDashboard;
