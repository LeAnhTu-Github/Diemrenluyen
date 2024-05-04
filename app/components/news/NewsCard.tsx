import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
const NewsCard = () => {
  return (
    <div className="w-full h-full rounded-3xl border border-[#ccc] px-4 py-2 flex flex-col gap-3">
      <div className="flex gap-4 items-center">
        <div>
          <Image
            src={"/images/avatar.jpeg"}
            alt="Avatar"
            width={35}
            height={35}
            className=" rounded-full"
          />
        </div>
        <p className="text-[#06080F] text-base font-semibold">
          Workshop: Diễn đàn trí tuệ
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#797D85] text-sm">
          Diễn giả: Mr. Mạnh Cường - AI engineer
        </p>
        <p className="text-[#797D85] text-sm">Thời gian: 20/4/2024</p>
      </div>
      <div className="flex justify-between w-full h-[36px]">
        <div className="w-[64px] h-full rounded-xl px-2 py-3 bg-[#FFF2EB] flex justify-center items-center">
          <p className="text-[#FF9159] text-sm font-semibold">23/30</p>
        </div>
        <div className="flex gap-4 h-full justify-center items-center">
          <button className="w-[80px] h-full border border-blue-400 text-blue-400 rounded-xl">
            Đăng kí
          </button>
          <CiHeart size={30} />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
