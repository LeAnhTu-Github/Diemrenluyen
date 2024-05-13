"use client";
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface userMenuProps {
  currentUser?: any | null;
}
const UserMenu = ({ currentUser }: userMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const handleSignout = () => {
    toast.success("Đăng xuất thành công");
    router.push("/");
    signOut();
  };
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => router.push("/")}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {currentUser?.name || "Đi tới trang chủ"}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4
                    md:py-1
                    md:px-2
                    border-[1px] 
                    border-neutral-200 
                    flex 
                    flex-row 
                    items-center 
                    gap-3 
                    rounded-full 
                    cursor-pointer 
                    hover:shadow-md 
                    transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
                        absolute 
                        rounded-xl 
                        shadow-md 
                        w-[40vw] 
                        md:w-3/4 
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm 
                        z-50
                    "
        >
          <div className="flex flex-col cursor-pointer ">
            {currentUser ? (
              currentUser.role === "admin" ? (
                <>
                  <MenuItem
                    onCLick={() => router.push("/")}
                    label="Về trang chủ"
                  />
                  <MenuItem
                    onCLick={() => router.push("/accounts")}
                    label="Quản lý tài khoản"
                  />
                  <MenuItem
                    onCLick={() => router.push("/registers")}
                    label="Quản lý đăng kí"
                  />
                  <MenuItem
                    onCLick={() => router.push(`/score`)}
                    label="Điểm rèn luyện"
                  />

                  <hr />
                  <MenuItem onCLick={handleSignout} label="Đăng xuất" />
                </>
              ) : (
                <>
                  <MenuItem
                    onCLick={() => router.push("/")}
                    label="Về trang chủ"
                  />
                  <MenuItem
                    onCLick={() => router.push("/accounts/" + currentUser.id)}
                    label="Thông tin tài khoản"
                  />
                  <MenuItem
                    onCLick={() => router.push(`/score`)}
                    label="Điểm rèn luyện"
                  />

                  <hr />
                  <MenuItem onCLick={handleSignout} label="Đăng xuất" />
                </>
              )
            ) : (
              <>
                <MenuItem onCLick={LoginModal.onOpen} label="Đăng nhập" />
                <MenuItem onCLick={registerModal.onOpen} label="Đăng kí" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
