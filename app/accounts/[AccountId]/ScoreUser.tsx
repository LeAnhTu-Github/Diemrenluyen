"use client";
import Avatar from "@/app/components/Avatar";
import React from "react";
import Chart from "@/app/components/Chart";
import UserStatis from "@/app/components/userStatics/UserStatic";
import { SafeListing } from "@/app/types";
import Image from "next/image";
interface ScoreUserProps {
  score: SafeListing;
}

const ScoreUser = ({ score }: ScoreUserProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-72  flex gap-4">
        <div className="h-full w-3/5 bg-white rounded-3xl flex flex-col p-4">
          <div className="flex gap-4 items-center">
            <div className="w-5 h-9 rounded-md bg-[#3D8AFF]"></div>
            <p className="text-[#06080F] text-2xl font-semibold">
              Thông tin cá nhân
            </p>
          </div>
          <hr className="mt-2" />
          <div className="flex h-full">
            <div className="w-1/4 h-full  flex justify-center items-center">
              <Avatar src={score?.avatar} width={150} height={150} />
            </div>
            <div className="w-2/4 h-full  flex flex-col px-3 py-5 gap-4 justify-center">
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Họ và tên:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.name}
                </p>
              </div>
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Email:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Lớp:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.classUneti}
                </p>
              </div>
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Khoa:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.department}
                </p>
              </div>
            </div>
            <div className="w-1/4 h-full  flex flex-col px-3 py-5 gap-4 justify-center">
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Khoá:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.courses}
                </p>
              </div>
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Điểm cộng:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.increasePoint}
                </p>
              </div>
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Điểm trừ:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.decreasePoint}
                </p>
              </div>
              <div className="flex gap-2">
                <label className=" text-sm font-semibold">Tổng điểm:</label>
                <p className="text-sm text-[#667580] font-bold">
                  {score?.totalScore}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-2/5 bg-white rounded-3xl px-5 pt-10">
          <Chart />
        </div>
      </div>
      <div className="w-full h-auto flex gap-4 bg-white rounded-3xl flex-col">
        <div className="w-full h-72 p-7">
          <div className="flex gap-4 items-center">
            <div className="w-5 h-9 rounded-md bg-[#3D8AFF]"></div>
            <p className="text-[#06080F] text-2xl font-semibold">
              Minh chứng điểm rèn luyện
            </p>
          </div>
          <div
            className="
            mt-4
            border-dashed 
            h-full
            border-2 
            p-5
            border-neutral-300
            flex
            justify-start
            items-center
            gap-4
            text-neutral-600 rounded-3xl"
          >
            {score?.imageSrc ? (
              <Image
                src={score?.imageSrc}
                width={250}
                height={250}
                alt={"Không có minh chứng"}
                className="rounded-3xl"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <h1>Chưa nộp điểm rèn luyện</h1>
              </div>
            )}
          </div>
        </div>
        <UserStatis />
      </div>
    </div>
  );
};

export default ScoreUser;
