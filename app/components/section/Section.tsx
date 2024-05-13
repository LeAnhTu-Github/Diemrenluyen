"use client";
import React from "react";
import SectionInfo from "./SectionInfo";
import SectionBox from "./SectionBox";
import { useSession } from "next-auth/react";
interface SidebarProps {
  currentUser?: any | null;
}
const Section = ({ currentUser }: SidebarProps) => {
  return (
    <div className="w-full h-[200px] flex gap-4">
      <SectionInfo currentUser={currentUser} />
      <SectionBox />
    </div>
  );
};

export default Section;
