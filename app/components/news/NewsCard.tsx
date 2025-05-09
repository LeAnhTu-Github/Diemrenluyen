"use client";
import React from "react";
import Image from "next/image";
import HeartButton from "../ui/HeartButton";
import { useRouter } from "next/navigation";
import useEventModal from "@/app/hooks/useEventModal";
import { Event } from "@prisma/client";
import { userRegister } from "@prisma/client";
import moment from "moment";
import "moment/locale/vi"; // Import locale tiếng Việt

interface DataProps {
  regis?: userRegister[];
  userId: string | null;
  event: Event;
}

const NewsCard = ({ event, userId, regis = [] }: DataProps) => {
  const router = useRouter();
  const eventModal = useEventModal();
  
  const check = regis?.some(
    (reg) => reg.eventId === event.id && reg.userId === userId && reg.isRegister
  ) ?? false;

  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          fill
          className="object-cover"
          alt={event?.title || "Event Image"}
          src={event?.imageUrl || ""}
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
          {event?.title}
        </div>
        <p className="text-xs text-muted-foreground">
          Diễn giả: {event?.author}
        </p>
        <p className="text-xs text-muted-foreground">
          Thời gian: {event?.date 
            ? moment(event.date).locale('vi').format('DD/MM/YYYY HH:mm')
            : "Chưa có ngày"}
        </p>

        <div className="flex justify-between w-full h-[36px] mt-5">
          <div className="flex gap-2">
            <button
              className="w-[80px] h-full btn btn-outline btn-success btn-xs"
              onClick={() => router.push(`/pageEvent/${event?.id}`)}
            >
              Xem
            </button>
            {check ? (
              <></>
            ) : (
              <>
                <button
                  className="w-[80px] h-full btn btn-outline btn-info btn-xs"
                  onClick={() => eventModal.onOpen(event.id)}
                >
                  Đăng kí
                </button>
              </>
            )}
          </div>
          <div className="flex gap-4 h-full justify-center items-center">
            <HeartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
