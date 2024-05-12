"use client";
import React from "react";
import { table } from "@/app/libs/data";
import { STATUS } from "@/app/types/index";
interface UserTableProps {
  status: STATUS;
  setStatus: (value: STATUS) => void;
}
const UserTable = ({ status, setStatus }: UserTableProps) => {
  let bodyContent;
  if (status === STATUS.signup) {
    bodyContent = (
      <>
        {table
          .filter((item) => item.status.signup)
          .map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <td>{item.event}</td>
              <td>{item.time}</td>
              <td>{item.link}</td>
              <td>
                <div
                  className={`flex justify-center items-center text-sm font-semibold rounded-lg p-3                 
                    ${
                      item.status.signup
                        ? "bg-[#E7FAE2] text-[#65BF4E]"
                        : "bg-[#FFEDED] text-[#F04A4A]"
                    }
                    `}
                >
                  {item.status.signup ? "Đăng kí" : "Chưa đăng kí"}
                </div>
              </td>
            </tr>
          ))}
      </>
    );
  } else if (status === STATUS.join) {
    bodyContent = (
      <>
        {table
          .filter((item) => item.status.join)
          .map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <td>{item.event}</td>
              <td>{item.time}</td>
              <td>{item.link}</td>
              <td>
                <div
                  className={`flex justify-center items-center text-sm font-semibold rounded-lg p-3                 
                    ${
                      item.status.join
                        ? "bg-[#EFF6FF] text-[#3D8AFF]"
                        : item.status.signup
                        ? "bg-[#E7FAE2] text-[#65BF4E]"
                        : "bg-[#FFEDED] text-[#F04A4A]"
                    }
                    `}
                >
                  {item.status.join
                    ? "Tham gia"
                    : item.status.signup
                    ? "Đăng kí"
                    : "Chưa đăng kí"}
                </div>
              </td>
            </tr>
          ))}
      </>
    );
  } else if (status === STATUS.notjoin) {
    bodyContent = (
      <>
        {table
          .filter((item) => item.status.notjoin)
          .map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <td>{item.event}</td>
              <td>{item.time}</td>
              <td>{item.link}</td>
              <td>
                <div
                  className={`flex justify-center items-center text-sm font-semibold rounded-lg p-3                 
                    ${
                      item.status.join
                        ? "bg-[#EFF6FF] text-[#3D8AFF]"
                        : item.status.signup
                        ? "bg-[#E7FAE2] text-[#65BF4E]"
                        : "bg-[#FFEDED] text-[#F04A4A]"
                    }
                    `}
                >
                  {item.status.join
                    ? "Tham gia"
                    : item.status.signup
                    ? "Đăng kí"
                    : "Chưa đăng kí"}
                </div>
              </td>
            </tr>
          ))}
      </>
    );
  } else {
    bodyContent = (
      <>
        {table.map((item) => (
          <tr key={item.id}>
            <th>{item.id}</th>
            <td>{item.event}</td>
            <td>{item.time}</td>
            <td>{item.link}</td>
            <td>
              <div
                className={`flex justify-center items-center text-sm font-semibold rounded-lg p-3                 
                    ${
                      item.status.join
                        ? "bg-[#EFF6FF] text-[#3D8AFF]"
                        : item.status.signup
                        ? "bg-[#E7FAE2] text-[#65BF4E]"
                        : "bg-[#FFEDED] text-[#F04A4A]"
                    }
                    `}
              >
                {item.status.join
                  ? "Tham gia"
                  : item.status.signup
                  ? "Đăng kí"
                  : "Chưa đăng kí"}
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  return (
    <div className="w-full h-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200 rounded-2xl">
              <th>STT</th>
              <th>Sự kiện</th>
              <th>Thời gian</th>
              <th>Link sự kiện</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>{bodyContent}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
