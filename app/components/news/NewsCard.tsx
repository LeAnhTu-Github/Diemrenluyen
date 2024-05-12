"use client";
import React from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useRouter } from "next/navigation";
import useEventModal from "@/app/hooks/useEventModal";
interface DataProps {
  id: string;
  title: string;
  name: string;
  description: string;
  time: string;
  link: string;
  author: string;
  host: string;
  imageEvent: string;
  address: string;
}
interface NewsCardProps {
  data: DataProps;
}
const NewsCard = ({ data }: NewsCardProps) => {
  const router = useRouter();
  const eventModal = useEventModal();
  return (
    <div className="w-full h-full rounded-3xl border border-[#ccc] px-4 py-4 flex flex-col gap-3">
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
        <p className="text-[#06080F] text-base font-semibold">{data.title}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#797D85] text-sm">Diễn giả: {data.author}</p>
        <p className="text-[#797D85] text-sm">Thời gian: {data.time}</p>
      </div>
      <div className="flex justify-between w-full h-[36px]">
        <div className="flex gap-2">
          <button
            className="w-[80px] h-full btn btn-outline btn-success btn-sm"
            onClick={() => router.push(`/eventPage/${data.id}`)}
          >
            Xem
          </button>
          <button
            className="w-[80px] h-full btn btn-outline btn-info btn-sm"
            onClick={eventModal.onOpen}
          >
            Đăng kí
          </button>
        </div>
        <div className="flex gap-4 h-full justify-center items-center">
          <HeartButton />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
