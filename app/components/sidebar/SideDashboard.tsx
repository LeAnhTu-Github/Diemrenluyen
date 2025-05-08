"use client";
import React from "react";
import { FaHome } from "react-icons/fa";
import { MdInfoOutline, MdCreditScore, MdEvent } from "react-icons/md";
import { 
  RiTeamLine,
  RiGroupLine,
  RiUserLine,
  RiFileChartLine,
  RiFeedbackLine,
} from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

interface SidebarProps {
  currentUser?: SafeUser | null;
}

const adminLinks = [
  { label: "Sự kiện", path: "/teacher/events", icon: MdEvent },
  { label: "Đoàn cơ sở", path: "/teacher/doancoso", icon: RiTeamLine },
  { label: "Chi đoàn", path: "/teacher/chidoan", icon: RiGroupLine },
  { label: "Đoàn viên", path: "/teacher/doanvien", icon: RiUserLine },
  { label: "Điểm rèn luyện", path: "/teacher/score", icon: RiFileChartLine },
  { label: "Đánh giá", path: "/teacher/danhgia", icon: RiFeedbackLine },
];

const userLinks = [
  { label: "Trang chủ", path: "/", icon: FaHome },
  { label: "Sự kiện", path: "/pageEvent", icon: MdEvent },
  { label: "Điểm rèn luyện", path: "/score", icon: MdCreditScore },
];

const SideDashboard = ({ currentUser }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = currentUser?.role === "admin";
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div>
      <div className="bg-white w-full px-2 py-4 rounded-2xl">
        {links.map((item) => {
          const isActive = pathname === item.path;
          return (
            <div
              key={item.path}
              className={`w-full flex items-center rounded-2xl px-4 py-5 mb-2 cursor-pointer transition
                ${isActive ? "bg-[#EFF6FF]" : "bg-white"}
              `}
              onClick={() => router.push(item.path)}
            >
              <item.icon
                size={20}
                className={isActive ? "fill-[#3D8AFF]" : "fill-[#797D85]"}
              />
              <p
                className={`text-base font-medium pl-4 ${
                  isActive ? "text-[#3D8AFF]" : "text-[#797D85]"
                }`}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideDashboard;
