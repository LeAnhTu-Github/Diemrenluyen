"use client";
import React from "react";
import Image from "next/image";
import Heading from "@/app/components/ui/Heading";
import useEventModal from "@/app/hooks/useEventModal";
import HeartButton from "@/app/components/ui/HeartButton";
import { Event } from "@prisma/client";
import { userRegister } from "@prisma/client";
import CountdownTimer from './_components/CountdownTimer';

interface EventClientProps {
  data: Event | undefined;
  regis: userRegister[];
  userId: string | null;
}

const EventClient = ({ data, regis, userId }: EventClientProps) => {
  const eventModal = useEventModal();
  const isRegistered = data && regis.some(
    (reg) => reg.eventId === data.id && reg.userId === userId && reg.isRegister
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-10 text-center animate-fade-in">
        <Heading
          title={data?.name ?? "Sự kiện không xác định"}
          subtitle={data?.date 
            ? new Date(data.date).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })
            : "Chưa có ngày"
          }
          className="text-4xl font-bold text-gray-900 tracking-tight"
          subtitleClassName="text-lg text-gray-500 mt-2"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Image and Details */}
        <div className="lg:col-span-3">
          {/* Event Image */}
          <div className="relative w-full h-[55vh] rounded-3xl overflow-hidden mb-8 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src={data?.imageUrl ?? "/placeholder-image.jpg"}
              alt={data?.name ?? "Event Image"}
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
            <div className="absolute top-6 right-6 transition-transform duration-300 hover:scale-110">
              <HeartButton />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Event Details */}
          
        </div>

        {/* Right Column: Registration Card */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl p-8 sticky top-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Tham gia ngay</h3>
            
            {/* Thay thế phần countdown cũ bằng CountdownTimer */}
            <div className="mb-8">
              <CountdownTimer targetDate={data?.date} />
            </div>

            <button
              className={`
                w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                ${isRegistered || !data?.date || new Date(data?.date || "") <= new Date()
                  ? "bg-green-100 text-green-800 border border-green-300 cursor-not-allowed opacity-80"
                  : "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-1"
                }
              `}
              onClick={() => {
                if (!isRegistered && data?.date && new Date(data.date) > new Date()) {
                  eventModal.onOpen(data?.id ?? "");
                }
              }}
              disabled={isRegistered || !data?.date || new Date(data?.date || "") <= new Date()}
            >
              {isRegistered 
                ? "Đã đăng ký" 
                : !data?.date 
                  ? "Chưa có thời gian"
                  : new Date(data?.date || "") <= new Date()
                    ? "Sự kiện đã diễn ra"
                    : "Đăng ký sự kiện"}
            </button>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 animate-slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Thông tin sự kiện</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <span className="font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Diễn giả:</span>
                <span className="text-gray-800 font-medium">{data?.author ?? "Chưa xác định"}</span>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Ban tổ chức:</span>
                <span className="text-gray-800 font-medium">{data?.host ?? "Chưa xác định"}</span>
              </div>
              <div className="flex items-center gap-4 group">
                <span className="font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Địa điểm:</span>
                <span className="text-gray-800 font-medium">{data?.address ?? "Chưa xác định"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {data?.description && (
        <div className="mt-12 bg-white rounded-3xl shadow-lg p-10 animate-slide-up">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Về sự kiện</h3>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {data.description.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-5 transition-all duration-300 hover:text-gray-900">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventClient;
