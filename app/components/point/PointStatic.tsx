import { STEPS } from "@/app/types";
import React from "react";
import { set } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

interface PointStaticProps {
  increase?: boolean;
  decrease?: boolean;
  evidence?: boolean;
  setStep: (value: STEPS) => void;
}
const PointStatic = ({
  increase,
  decrease,
  evidence,
  setStep,
}: PointStaticProps) => {
  const step2 = () => {
    setStep(STEPS.REDUCE);
  };
  const step1 = () => {
    setStep(STEPS.INCREASE);
  };
  const step3 = () => {
    setStep(STEPS.PROOF);
  };

  return (
    <div className="w-full h-[52px] flex justify-between">
      <div className="w-1/2 h-full p-2 rounded-2xl bg-[#F1F3F5] flex gap-2">
        <div
          className={`w-1/3 h-full flex justify-center items-center text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF] 
          ${increase ? "bg-white text-[#3D8AFF]" : "text-[#9297A1] "}         
        `}
          onClick={step1}
        >
          Điểm cộng
        </div>
        <div
          className={`w-1/3 h-full flex justify-center items-center  text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF] 
          ${decrease ? "bg-white text-[#3D8AFF]" : "text-[#9297A1]"}
        `}
          onClick={step2}
        >
          Điểm trừ
        </div>
        <div
          className={`w-1/3 h-full flex justify-center items-center  text-base font-medium rounded-xl hover:bg-white hover:text-[#3D8AFF] 
          ${evidence ? "bg-white text-[#3D8AFF]" : "text-[#9297A1]"}
        `}
          onClick={step3}
        >
          Minh chứng
        </div>
      </div>

      <label className="input input-bordered flex items-center gap-2 rounded-xl">
        <CiSearch size={30} className="fill-[#9297A1]" />
        <input type="text" className="grow" placeholder="Tìm kiếm" />
      </label>
    </div>
  );
};

export default PointStatic;
