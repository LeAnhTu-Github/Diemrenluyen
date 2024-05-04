"use client";
import React from "react";
import { SafeListing } from "../types";
import ClientOnly from "../components/ClientOnly";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
interface ScoreProps {
  scores: SafeListing[];
}

const AccountPage = ({ scores }: ScoreProps) => {
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
          <div className=" flex w-full h-auto">
            <select
              className="select select-info w-full max-w-60 my-2 mx-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option selected>Khoa (All)</option>
              <option>CNTT</option>
              <option>NNT</option>
              <option>TCNH</option>
            </select>
            <select
              className="select select-info w-full max-w-60 my-2 mx-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option selected>Lớp (All)</option>
              <option>DHTI15A8HN</option>
              <option>DHTI15A9HN</option>
              <option>DHTI15A10HN</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr className="bg-base-200 rounded-2xl z-0 w-full">
                <th></th>
                <th>Họ và tên</th>
                <th>Lớp</th>
                <th>Khoa</th>
                <th>Khoá học</th>
                <th>Điểm rèn luyện</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {search !== "Khoa (All)" && filter !== "Lớp (All)" ? (
                <>
                  {scores
                    .filter(
                      (score) =>
                        score.classUneti === filter &&
                        score.department === search
                    )
                    .map((score) => (
                      <tr key={score.id}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>{score.name}</td>
                        <td>{score.classUneti}</td>
                        <td>{score.department}</td>
                        <td>{score.courses}</td>
                        <td>{score.totalScore}</td>
                        <td>
                          <button
                            className="btn btn-outline btn-sm btn-info mr-2"
                            onClick={() => router.push(`/accounts/${score.id}`)}
                          >
                            Xem
                          </button>
                          <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => onDelete(score.id)}
                            disabled={deletingId === score.id}
                          >
                            {deletingId === score.id ? "Đang xoá..." : "Xoá"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ) : search !== "Khoa (All)" && filter === "Lớp (All)" ? (
                <>
                  {scores
                    .filter((score) => score.department === search)
                    .map((score) => (
                      <tr key={score.id}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>{score.name}</td>
                        <td>{score.classUneti}</td>
                        <td>{score.department}</td>
                        <td>{score.courses}</td>
                        <td>{score.totalScore}</td>
                        <td>
                          <button
                            className="btn btn-outline btn-sm btn-info mr-2"
                            onClick={() => router.push(`/accounts/${score.id}`)}
                          >
                            Xem
                          </button>
                          <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => onDelete(score.id)}
                            disabled={deletingId === score.id}
                          >
                            {deletingId === score.id ? "Đang xoá..." : "Xoá"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ) : filter !== "Lớp (All)" && search === "Khoa (All)" ? (
                <>
                  {scores
                    .filter((score) => score.classUneti === filter)
                    .map((score) => (
                      <tr key={score.id}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <td>{score.name}</td>
                        <td>{score.classUneti}</td>
                        <td>{score.department}</td>
                        <td>{score.courses}</td>
                        <td>{score.totalScore}</td>
                        <td>
                          <button
                            className="btn btn-outline btn-sm btn-info mr-2"
                            onClick={() => router.push(`/accounts/${score.id}`)}
                          >
                            Xem
                          </button>
                          <button
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => onDelete(score.id)}
                            disabled={deletingId === score.id}
                          >
                            {deletingId === score.id ? "Đang xoá..." : "Xoá"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <>
                  {scores.map((score) => (
                    <tr key={score.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>{score.name}</td>
                      <td>{score.classUneti}</td>
                      <td>{score.department}</td>
                      <td>{score.courses}</td>
                      <td>{score.totalScore}</td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm btn-info mr-2"
                          onClick={() => router.push(`/accounts/${score.id}`)}
                        >
                          Xem
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => onDelete(score.id)}
                          disabled={deletingId === score.id}
                        >
                          {deletingId === score.id ? "Đang xoá..." : "Xoá"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
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
              Quản lý sinh viên
            </p>
          </div>

          {bodyContent}
        </div>
      </div>
    </ClientOnly>
  );
};

export default AccountPage;
