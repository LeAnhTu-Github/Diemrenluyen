"use client";
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { MdCreditScore } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
interface SidebarProps {
  currentUser?: SafeUser | null;
}
const SideDashboard = ({ currentUser }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  let checkHome;
  let checkPoit;
  let checkEvent;
  let checkAccount;
  switch (pathname) {
    case "/":
      checkHome = true;
      break;
    case "/score":
      checkPoit = true;
      break;
    case "/eventPage":
      checkEvent = true;
      break;
    case "/accounts":
      checkAccount = true;
      break;
    default:
      checkHome = false;
      checkPoit = false;
      checkEvent = false;
      checkAccount = false;
  }
  return (
    <div>
      <div className="bg-white w-full h-[336px] px-6 py-4">
        <div
          className={`w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 
            ${checkHome ? "bg-[#EFF6FF]" : "bg-white"}
          `}
          onClick={() => router.push("/")}
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
        <div
          className={`w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 
            ${checkEvent ? "bg-[#EFF6FF]" : "bg-white"}
          `}
          onClick={() => router.push("/eventPage")}
        >
          <MdEvent
            size={20}
            className={`${checkEvent ? "fill-[#3D8AFF]" : "fill-[#797D85]"}`}
          />
          <p
            className={`text-base ${
              checkEvent ? "text-[#3D8AFF]" : "text-[#797D85]"
            } font-medium pl-4`}
          >
            Sự Kiện
          </p>
        </div>
        <div
          className={`w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 
        ${checkAccount ? "bg-[#EFF6FF]" : "bg-white"}`}
          onClick={() => router.push(`/accounts/${currentUser?.id}`)}
        >
          <MdInfoOutline
            size={20}
            className={`${checkAccount ? "fill-[#3D8AFF]" : "fill-[#797D85]"}`}
          />
          <p
            className={`text-base ${
              checkAccount ? "text-[#3D8AFF]" : "text-[#797D85]"
            } font-medium pl-4`}
          >
            Thông tin
          </p>
        </div>
        <div
          className={`w-full h-1/6 flex justify-start items-center rounded-2xl px-4 py-5 
        ${checkPoit ? "bg-[#EFF6FF]" : "bg-white"}`}
          onClick={() => router.push("/score")}
        >
          <MdCreditScore
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
      </div>
    </div>
  );
};

export default SideDashboard;
