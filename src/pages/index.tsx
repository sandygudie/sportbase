/* eslint-disable @next/next/no-img-element */
import { brands, category, products } from "@/data";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Product } from "@/types";

export default function Home() {
  const [latestProduct, setlatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <main>
        <div className="">
          <ReactPlayer
            className="w-full h-full object-cover m-auto"
            playing={true}
            loop={true}
            controls={true}
            url="https://res.cloudinary.com/dvpoiwd0t/video/upload/v1686736888/banner-video_mowhir.mp4"
          />

          <div className="py-28">
            <div className="px-4 md:px-12 flex items-center flex-wrap gap-6">
              {products.map((item) => {
                return (
                  <Link
                    href={`/collection${item.link}`}
                    key={item.id}
                    className="grow relative overflow-hidden w-[25em]"
                  >
                    <div className="absolute z-20 bottom-10 w-full left-16">
                      <p className="font-bold text-3xl text-white pb-6">
                        {item.name}
                      </p>
                      <Button
                        className="w-36 font-bold p-3"
                        variant="contained"
                      >
                        SHOP NOW{" "}
                      </Button>{" "}
                    </div>
                    <div
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: " no-repeat",
                      }}
                      className="w-full 2xl:h-[650px] h-[550px] transition-transform ease-in delay-150 hover:scale-110 duration-1000"
                    ></div>
                  </Link>
                );
              })}
            </div>

            <div className="my-16 md:my-36 px-4 md:px-12">
              <h2 className="text-center mb-4 md:mb-20 text-2xl xl:text-3xl">
                Brands
              </h2>
              <div className="flex items-center flex-wrap gap-6">
                {brands.map((item) => {
                  return (
                    <Link
                      href={`/collection${item.link}`}
                      key={item.id}
                      className="grow relative overflow-hidden w-[25em]"
                    >
                      <div className="absolute z-20 bottom-10 w-full left-16 ">
                        <p className="font-bold text-2xl xl:text-2xl text-white pb-6">
                          {item.name}
                        </p>
                      </div>
                      <div
                        style={{
                          background: `url(${item.image}) no-repeat`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                        className="w-full 2xl:h-[550px] h-[400px] transition-transform ease-in delay-150 hover:scale-110 duration-1000"
                      ></div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center my-12 md:my-24">
                <Button variant="contained" className="p-3 font-bold w-64">
                  View All Footwears
                </Button>
              </div>
            </div>

            <div className="px-12 bg-gray-100">
              <div className="py-12 md:py-24">
                <p className="text-center mb-4 md:mb-12 text-lg md:text-2xl">
                  New Arrivals
                </p>
                <div className="overflow-hidden my-5">
                  <div className="w-[20em] md:w-full m-auto flex overflow-x-auto  items-center md:justify-center gap-12">
                    {latestProduct.map((item: Product) => {
                      return (
                        <Link href={"/"} key={item._id} className="text-center">
                          <img
                            className="w-72 md:w-96 max-w-prose md:max-w-full h-64 object-cover"
                            src={item.imageUrl}
                            alt={item.name}
                          />
                          <p className="text-base pt-3">{item.name}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center">
                  <Button className="p-3 w-48 font-bold" variant="contained">
                    Show all latest
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-16 md:pt-24 md:pb-12 px-12">
              <p className="text-center mb-4 md:mb-12 text-lg md:text-2xl">
                Shop by categories
              </p>
              <div className="overflow-hidden my-5">
                <div className="w-[20em] md:w-full m-auto flex overflow-x-auto items-center md:justify-center gap-12">
                  {category.map((item) => {
                    return (
                      <Link
                        href={`/collection${item.link}`}
                        key={item.id}
                        className="text-center"
                      >
                        <img
                          className="w-72 md:w-96 max-w-prose md:max-w-full h-64 object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                        <p className="text-base pt-3">{item.name}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {loading && <Spinner/>} */}
      </main>
    </>
  );
}

// swim suit add to product
// remove dollar from money
