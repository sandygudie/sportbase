/* eslint-disable @next/next/no-img-element */
import { brands, category, products } from "@/data";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Swipeable from "@/components/Swipeable";
import { client } from "@/utilis";
import Card from "@/components/Card";

export default function Home() {
  const [latestProduct, setlatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    getLatestProduct();
  }, []);

  const getLatestProduct = async () => {
    const productResponse = await client.fetch(`*[]{
      ...,
    "imageUrl": image.asset->url
  }`);
    let filtered = productResponse.filter(
      (ele: Product) => ele.timeline === "latest"
    );
    console.log(filtered);
    setlatestProducts(filtered);
  };

  return (
    <>
      <main>
        <div className="">
          <Swipeable />
          <div className="py-28">
            <div className="px-4 md:px-8 ">
              <h1 className=" text-2xl text-center font-thin mb-4 md:mb-20">
                {" "}
                Collections
              </h1>
              <div className="flex items-center flex-wrap justify-between gap-8">
                {products.map((item) => {
                  return (
                    <Link
                      href={`/collection${item.link}`}
                      key={item.id}
                      className="grow w-96"
                    >
                      <div className="relative overflow-hidden">
                        <div
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: " no-repeat",
                          }}
                          className="w-full 2xl:h-[650px] h-[550px] transition-transform ease-in delay-150 hover:scale-110 duration-1000"
                        ></div>
                      </div>
                      <div className="p-6 absolute bottom-5">
                        <p className="font-medium text-white text-2xl pb-8">
                          {item.name}
                        </p>
                        <Button
                          className=" w-48 text-sm bg-white text-dark font-thin tracking-widest px-2 h-[3.5em] rounded-sm"
                          variant="contained"
                        >
                          {`SHOP ${item.name.toUpperCase()}`}{" "}
                        </Button>{" "}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="my-10 md:my-28 px-4 md:px-12">
              <h2 className="font-thin text-center mb-4 md:mb-20  text-2xl">
                Our Brands
              </h2>
              <div className="flex items-center justify-center flex-wrap gap-10">
                {brands.map((item) => {
                  return (
                    <Link
                      href={`/collection${item.link}`}
                      key={item.id}
                      className="relative flex items-center justify-center border border-1 border-gray-200/20 border-solid py-2 px-4"
                    >
                      <img
                        className="w-20 h-16"
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="px-0 md:px-12 bg-gray-100/30">
              <div className="py-20">
                <h2 className="text-center font-thin mb-4 md:mb-20 text-2xl">
                  New Arrivals
                </h2>
                <div className="overflow-hidden my-5">
                  <div className="w-[22em] md:w-full m-auto flex overflow-x-auto items-center md:justify-center gap-12">
                    {latestProduct.map((item: Product, i: number) => {
                      return (
                        <div className=" bg-gray-100 p-8" key={item._id}>
                          {i < 5 && <Card item={item} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-center mt-12 md:mt-24">
                  <Button variant="contained" className="p-3 font-bold w-64">
                    All Latest Products
                  </Button>
                </div>
              </div>
            </div>

            <div className="mx-4 md:mx-8 bg-dark h-72 md:h-[30em] justify-center flex items-center mt-20">
              <h3 className="text-6xl md:text-8xl text-white font-semibold">
                Sales
              </h3>
              <div className="w-64 md:w-96 absolute -bottom-36 shadow-md bg-white text-center p-4 md:p-12">
                <p className="font-bold text-xl">SALE</p>
                <p className="p-3">
                  Buy high-quality articles for the best prices. Discounts from
                  25% to 80%!
                </p>
                <div className="text-center">
                  <Button
                    variant="contained"
                    className=" w-60 md:w-64 p-3 font-bold w-64"
                  >
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// swim suit add to product

// fix all things before going to the login and payout
// check spelling case(letter)
// review your structure
// work on responsiveness
// loading and performances

// pagination(material ui)
// you will add carousel for your images
// The gender collection has to be handled diffeently for the filter component

// idea box
// price comparism for restaurant
// rent your outfit, wedding dress
