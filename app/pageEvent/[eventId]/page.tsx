import React from "react";
import EventClient from "./EventClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
interface IParams {
  eventId?: string;
}
const page = async ({ params }: { params: IParams }) => {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const regis = await prisma.userRegister.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const data = events.find((event) => event.id === params.eventId);
  return (
    <div className="max-w-[2520px] mx-auto ">
      <div className="w-full h-auto rounded-3xl flex flex-col gap-4 bg-white p-10">
        <EventClient data={data} userId={userId || null} regis={regis || null} />
      </div>
    </div>
  );
};

export default page;
