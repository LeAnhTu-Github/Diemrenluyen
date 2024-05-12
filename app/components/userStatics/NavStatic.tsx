"use client";
import React from "react";
import { STATUS } from "@/app/types";
import { CiSearch } from "react-icons/ci";
interface NavStaticProps {
  status: STATUS;
  setStatus: (value: STATUS) => void;
}
const NavStatic = ({ status, setStatus }: NavStaticProps) => {
  return (
    <div className="w-full h-[52px] flex justify-between">
      <div className="w-3/5 h-full p-2 rounded-2xl bg-[#F1F3F5] flex gap-2">
        <div
          className={`w-1/4 h-full flex justify-center items-center  text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]
            ${
              status === STATUS.all
                ? "bg-white text-[#3D8AFF]"
                : "text-[#9297A1]"
            }
          `}
          onClick={() => setStatus(STATUS.all)}
        >
          Tất cả
        </div>
        <div
          className={`w-1/4 h-full flex justify-center items-center text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]
          ${
            status === STATUS.signup
              ? "bg-white text-[#3D8AFF]"
              : "text-[#9297A1]"
          }
          `}
          onClick={() => setStatus(STATUS.signup)}
        >
          Đăng kí
        </div>
        <div
          className={`w-1/4 h-full flex justify-center items-center text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]
        ${status === STATUS.join ? "bg-white text-[#3D8AFF]" : "text-[#9297A1]"}
        `}
          onClick={() => setStatus(STATUS.join)}
        >
          Đã tham gia
        </div>
        <div
          className={`w-1/4 h-full flex justify-center items-center  text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF]
        ${
          status === STATUS.notjoin
            ? "bg-white text-[#3D8AFF]"
            : "text-[#9297A1]"
        }
        `}
          onClick={() => setStatus(STATUS.notjoin)}
        >
          Sắp diễn ra
        </div>
      </div>

      <label className="input input-bordered flex items-center gap-2 rounded-xl border">
        <CiSearch size={30} className="fill-[#9297A1]" />
        <input type="text" className="grow" placeholder="Tìm kiếm" />
      </label>
    </div>
  );
};

export default NavStatic;
