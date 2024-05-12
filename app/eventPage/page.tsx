"use client";
import React from "react";
import NewsCard from "../components/news/NewsCard";
import { eventData } from "@/app/libs/data";
import { useState } from "react";

const NewsPage = () => {
  const [itemsToShow, setItemsToShow] = useState(3);

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 3);
  };
  return (
    <div className="w-full h-auto bg-white p-7 rounded-3xl flex flex-col gap-4 mt-4">
      <div className="flex gap-4 items-center">
        <div className="w-5 h-9 rounded-md bg-[#FF9159]"></div>
        <p className="text-[#06080F] text-2xl font-semibold">
          Danh sách sự kiện
        </p>
      </div>
      <div className="w-full h-full pt-8">
        <div className="carousel carousel-end rounded-box w-full h-full gap-8 flex flex-wrap">
          {eventData.slice(0, itemsToShow).map((data, index) => (
            <div className="carousel-item w-[30%]" key={index}>
              <NewsCard data={data} />
            </div>
          ))}
        </div>
        {itemsToShow < eventData.length && (
          <div className="w-full h-auto flex justify-center items-center mt-10">
            <button
              className="btn btn-outline btn-error btn-md"
              onClick={handleShowMore}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
