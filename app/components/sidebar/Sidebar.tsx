"use client";
import React from "react";
import Image from "next/image";
import SideDashboard from "./SideDashboard";
import SideAvatar from "./SideAvatar";
import { SafeUser } from "@/app/types";
interface SidebarProps {
  currentUser?: SafeUser | null;
}
const Sidebar = ({ currentUser }: SidebarProps) => {
  return (
    <div className="w-[312px] h-screen bg-white rounded-3xl p-6">
      <div className="w-full h-12 flex justify-center">
        <div>
          <Image src={"/images/logo.jpeg"} alt="Logo" width={45} height={45} />
        </div>
      </div>
      <SideDashboard currentUser={currentUser} />
    </div>
  );
};

export default Sidebar;
