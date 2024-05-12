"use client";
import React from "react";
import { eventData } from "@/app/libs/data";
import Image from "next/image";
import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import useEventModal from "@/app/hooks/useEventModal";
interface EventClientProps {
  id: string | undefined;
}
const EventClient = ({ id }: EventClientProps) => {
  const eventModal = useEventModal();
  const data = eventData.find((event) => event.id === id);
  return (
    <>
      <Heading title={data?.name ?? ""} subtitle={data?.time ?? ""} />
      <div className="w-full h-[80vh] overflow-hidden rounded-xl relative">
        <Image
          src={data?.imageEvent ?? ""}
          alt="Image"
          fill
          className=" object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton />
        </div>
      </div>
      <div className="w-full h-auto flex justify-between pr-10">
        <div className="w-3/5 flex flex-col h-full gap-3">
          <div className="flex gap-11 items-end">
            <p>Diễn giả:</p>{" "}
            <p className=" text-xl font-bold">{data?.author ?? ""} </p>
          </div>
          <div className="flex gap-5 items-end">
            <p>Ban tổ chức:</p>{" "}
            <p className=" text-xl font-bold">{data?.host}</p>
          </div>
          <div className="flex gap-11 items-end">
            <p>Địa điểm: </p>{" "}
            <p className=" text-xl font-bold">{data?.address}</p>
          </div>
        </div>
        <div className="w-2/5 h-full flex flex-end">
          <div
            className="
            w-full h-full
            flex flex-col justify-center items-center gap-5 border border-solid border-[#3D8AFF] rounded-2xl shadow-lg p-2
            
          "
          >
            <p>Thòi gian còn lại: 12d : 3h : 24m</p>
            <button
              className="btn btn-outline btn-info"
              onClick={eventModal.onOpen}
            >
              Đăng kí
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10">
        {data?.description.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </>
  );
};

export default EventClient;
