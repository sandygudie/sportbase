import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { banner } from "@/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper";

export default function Swipeable() {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {banner.map((step, index) => (
        <SwiperSlide key={step.label} className="w-full ">
          <Link href={`collection${step.link}`}>
            <div
              style={{
                backgroundImage: `url(${step.imgPath})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundColor: "#f6f6f6",
                backgroundRepeat: "no-repeat",
              }}
              className="h-[600px]"
            ></div>
            <div className="p-6 absolute bottom-10 ">
              <p className=" w-64 text-4xl font-bold  text-white  pb-6">
                {step.label?.toUpperCase()}
              </p>
              <Button
                className="text-sm md:text-[16px] text-white  w-36 font-bold p-3"
                variant="contained"
              >
                SHOP NOW{" "}
              </Button>{" "}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
