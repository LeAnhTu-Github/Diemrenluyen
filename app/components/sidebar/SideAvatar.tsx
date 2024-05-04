import React from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
interface SidebarProps {
  currentUser?: SafeUser | null;
}
const SideAvatar = ({ currentUser }: SidebarProps) => {
  return (
    <div>
      <div className="bg-white w-full h-[240px] rounded-3xl border px-6 py-4 gap-4 mb-4 border-{#DADDE0} flex flex-col items-center">
        <Avatar src={currentUser?.image} width={50} height={50} />
        <div className=" w-full flex flex-col items-center justify-center">
          <p className=" text-xs font-bold text-{#06080F}">
            {currentUser?.name}
          </p>
          <p className=" text-xs font-semibold text-{#797D85} opacity-50">
            {currentUser?.email}
          </p>
        </div>
        <div className="w-12 h-12 bg-blue-300 rounded-2xl flex justify-center items-center">
          <p className="font-bold text-base text-blue-600">84</p>
        </div>
      </div>
    </div>
  );
};

export default SideAvatar;
