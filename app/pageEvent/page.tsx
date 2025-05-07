import React from "react";
import ListEvent from "./ListEvent";
import prisma from '@/app/libs/prismadb'
import NewsCard from "../components/news/NewsCard";
import getCurrentUser from "../actions/getCurrentUser";

const NewsPage = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentUser = await getCurrentUser();
  const userId = currentUser?.id

  const regis = await prisma.userRegister.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full bg-white p-7 rounded-3xl flex flex-col gap-4 mt-4">
      <div className="flex gap-4 items-center">
        <div className="w-5 h-9 rounded-md bg-[#FF9159]"></div>
        <p className="text-[#06080F] text-2xl font-semibold">
          Sự kiện sắp diễn ra
        </p>
      </div>

      <ListEvent events={events} userId={userId ?? null} regis={regis} />
    </div>
  );
};

export default NewsPage;
