import React from "react";
import ClientOnly from "@/app/components/ClientOnly";
import EventClient from "./EventClient";
interface IParams {
  eventId?: string;
}
const page = async ({ params }: { params: IParams }) => {
  return (
    <div className="max-w-[2520px] mx-auto ">
      <div className="w-full h-auto rounded-3xl flex flex-col gap-4 bg-white p-10">
        <ClientOnly>
          <EventClient id={params.eventId} />
        </ClientOnly>
      </div>
    </div>
  );
};

export default page;
