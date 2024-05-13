"use client";
import React from "react";
import ClientOnly from "../components/ClientOnly";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SafeRegis } from "../types";
import toast from "react-hot-toast";
interface ScoreProps {
  regis: SafeRegis[];
}

const RegisterPage = ({ regis }: ScoreProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [filter, setFilter] = useState("Lớp (All)");
  const [search, setSearch] = useState("Khoa (All)");
  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/trainscore/${id}`)
        .then(() => {
          toast.success("Xoá thành công sinh viên");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Có lỗi xảy ra khi xoá sinh viên");
          toast.error(error.message);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  const bodyContent = (
    <>
      <div className="w-full h-auto">
        <div className="overflow-x-auto w-f">
          <div className=" flex w-full h-auto"></div>
          <table className="table">
            <thead>
              <tr className="bg-base-200 rounded-2xl z-0 w-full">
                <th></th>
                <th>Mã Sinh viên</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Lớp</th>
                <th>Câu hỏi</th>
              </tr>
            </thead>
            <tbody>
              <>
                {regis.map((score) => (
                  <tr key={score.id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>

                    <td>{score.msv}</td>
                    <td>{score.email}</td>
                    <td>{score.name}</td>
                    <td>{score.classUneti}</td>
                    <td>{score.question}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  return (
    <ClientOnly>
      <div className="max-w-[2520px] mx-auto ">
        <div className="w-full h-auto bg-white p-7 rounded-3xl flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-5 h-9 rounded-md bg-[#3D8AFF]"></div>
            <p className="text-[#06080F] text-2xl font-semibold">
              Danh sách đăng ký sự kiện
            </p>
          </div>

          {bodyContent}
        </div>
      </div>
    </ClientOnly>
  );
};

export default RegisterPage;
