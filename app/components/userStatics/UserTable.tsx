import React from "react";
const table = [
  {
    id: 1,
    event: "Hội thảo khoa học và công nghệ",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: true,
      signup: false,
      notjoin: false,
    },
  },
  {
    id: 2,
    event: "Workshop trí tuệ nhân tạo",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: false,
      signup: true,
      notjoin: false,
    },
  },
  {
    id: 3,
    event: "Workshop trí tuệ nhân tạo",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: false,
      signup: false,
      notjoin: true,
    },
  },
  {
    id: 4,
    event: "Hội thảo khoa học và công nghệ",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: true,
      signup: false,
      notjoin: false,
    },
  },
  {
    id: 5,
    event: "Hội thảo khoa học và công nghệ",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: true,
      signup: false,
      notjoin: false,
    },
  },
  {
    id: 6,
    event: "Hội thảo khoa học và công nghệ",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: true,
      signup: false,
      notjoin: false,
    },
  },
  {
    id: 7,
    event: "Workshop trí tuệ nhân tạo",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: false,
      signup: true,
      notjoin: false,
    },
  },
  {
    id: 8,
    event: "Workshop trí tuệ nhân tạo",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: false,
      signup: false,
      notjoin: true,
    },
  },
  {
    id: 9,
    event: "Hội thảo khoa học và công nghệ",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: true,
      signup: false,
      notjoin: false,
    },
  },
  {
    id: 10,
    event: "Workshop trí tuệ nhân tạo",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: false,
      signup: true,
      notjoin: false,
    },
  },
  {
    id: 11,
    event: "Workshop trí tuệ nhân tạo",
    time: "15/3/2024",
    link: "https://uneti.edu.vn/category/thong-bao/",
    status: {
      join: false,
      signup: false,
      notjoin: true,
    },
  },
];
const UserTable = () => {
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
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
