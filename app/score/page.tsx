"use client";
import React from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { STEPS } from "../types";
import ClientOnly from "../components/ClientOnly";
import PointStatic from "../components/point/PointStatic";
import Counter from "../components/inputs/Counter";
import ImageUpload from "../components/inputs/ImageUpload";
import { dataIncrese, dataMinus } from "../libs/data";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INCREASE);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      avatar: "",
      classUneti: "DHTI15A8HN",
      department: "CNTT",
      courses: "2021-2022",
      totalScore: 0,
      increasePoint: 0,
      decreasePoint: 0,
      arrIncrease: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
      },
      arrDecrease: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
      },
      imageSrc: "",
    },
  });
  const arrIncrease = watch("arrIncrease");
  const arrDecrease = watch("arrDecrease");

  const increasePoint = watch("increasePoint");
  const decreasePoint = watch("decreasePoint");
  const imageSrc = watch("imageSrc");
  const sumIncrease = (arr: any) => {
    let sum = 0;
    Object.keys(arr).forEach((key) => {
      sum += arr[key];
    });
    return sum;
  };
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
    window.scrollTo(0, 0);
  };
  const onNext = async () => {
    setStep((value) => value + 1);
    window.scrollTo(0, 0);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setCustomValue("increasePoint", sumIncrease(arrIncrease));
    setCustomValue("decreasePoint", sumIncrease(arrDecrease));

    setCustomValue(
      "totalScore",
      65 + sumIncrease(arrIncrease) - sumIncrease(arrDecrease)
    );
    if (step !== STEPS.PROOF) {
      return onNext();
    }
    setIsLoading(true);

    axios
      .post("/api/trainscore", data)
      .then(() => {
        toast.success("Thêm điểm rèn luyện thành công! ");

        router.push("/");
        setStep(STEPS.INCREASE);
      })
      .catch((error) => {
        toast.error("Thêm điểm rèn luyện không thành công: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  let bodyContent = <div>Defalut</div>;
  if (step === STEPS.INCREASE) {
    bodyContent = (
      <>
        <PointStatic
          increase={true}
          decrease={false}
          evidence={false}
          setStep={setStep}
        />
        <div className="w-full h-auto">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-200 rounded-2xl w-full">
                  <th>STT</th>
                  <th>Tiêu chí xét điểm</th>
                  <th>Điểm</th>
                </tr>
              </thead>
              <tbody>
                {dataIncrese.map((item) => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.description}</td>
                    <td>
                      <Counter
                        value={arrIncrease[item.id]}
                        onChange={(value) =>
                          setCustomValue(`arrIncrease.${item.id}`, value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else if (step === STEPS.REDUCE) {
    bodyContent = (
      <>
        <PointStatic
          increase={false}
          decrease={true}
          evidence={false}
          setStep={setStep}
        />
        <div className="w-full h-auto">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-200 rounded-2xl w-full">
                  <th>STT</th>
                  <th>Tiêu chí xét điểm</th>
                  <th>Điểm</th>
                </tr>
              </thead>
              <tbody>
                {dataMinus.map((item) => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.description}</td>
                    <td>
                      <Counter
                        value={arrDecrease[item.id]}
                        onChange={(value) =>
                          setCustomValue(`arrDecrease.${item.id}`, value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    bodyContent = (
      <>
        <PointStatic
          increase={false}
          decrease={false}
          evidence={true}
          setStep={setStep}
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </>
    );
  }
  return (
    <ClientOnly>
      <div className="max-w-[2520px] mx-auto ">
        <div className="w-full h-auto bg-white p-7 rounded-3xl flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-5 h-9 rounded-md bg-[#3D8AFF]"></div>
            <p className="text-[#06080F] text-2xl font-semibold">
              Điểm rèn luyện
            </p>
          </div>

          {bodyContent}
          <div className="flex gap-4 justify-end">
            <button
              onClick={onBack}
              className="bg-[#F1F3F5] text-[#3D8AFF] px-6 py-2 rounded-lg"
            >
              Quay lại
            </button>
            {step !== STEPS.PROOF ? (
              <>
                <div
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#3D8AFF] text-white px-6 py-2 rounded-lg"
                >
                  Tiếp theo
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#3D8AFF] text-white px-6 py-2 rounded-lg"
                >
                  Xác nhận
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default Page;
