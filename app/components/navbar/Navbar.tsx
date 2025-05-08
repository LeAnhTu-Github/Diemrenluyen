"use client";

import { SafeUser } from "@/app/types";
import Container from "../Container";
import UserMenu from "./UserMenu";
import { useRouter } from "next/navigation";
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className=" w-full bg-white shadow-sm rounded-xl">
      <div
        className="
          py-2
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <h1 className=" font-bold text-xl">Trang chủ</h1>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
