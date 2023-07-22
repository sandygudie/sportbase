import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { banner } from "@/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import { Autoplay, Pagination } from "swiper";

export default function Swipeable() {
  return (
    <Swiper
  loop={true}
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
        <SwiperSlide key={step.label} className="w-full">
          <div className="relative">
          <Link href={`collection${step.link}`}  className="relative">
              <Image
              src={step.imgPath}
              alt={step.label}
              width={0}
              height={0}
              loading="lazy"
              sizes="100vw"
              className="object-cover w-full h-[650px]"
            />
            <div className="p-6 absolute bottom-10 ">
              <p className={`w-64 text-4xl font-bold ${index % 2 ? 'text-white' : "text-primary"}  pb-6`}>
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
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
