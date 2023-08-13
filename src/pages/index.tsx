/* eslint-disable @next/next/no-img-element */
import { dropdownNav, collection_category } from "@/data";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import Swipeable from "@/components/Swipeable";
import { client } from "@/utilis";
import Card from "@/components/Card";
import Spinner from "@/components/Spinner";

import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const [latestProduct, setlatestProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    getLatestProduct();
  }, []);

  const getLatestProduct = async () => {
    setLoading(true);
    try {
      const productResponse = await client.fetch(`*[]{
        ...,
      "imageUrl": image.asset->url
    }`);
      let filtered = productResponse.filter(
        (ele: Product) => ele.timeline === "latest"
      );
      setLoading(false);
      setlatestProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="">
          <Swipeable />
          <div className="pt-16 pb-28 md:py-28">
            <div className="px-4 md:px-8 ">
              <h1 className="text-2xl text-center font-normal mb-8 md:mb-20">
                {" "}
                Collections
              </h1>
              <div className="flex items-center flex-wrap justify-between gap-8">
                {collection_category.map((item) => {
                  return (
                    <Link
                      href={`/collection${item.link}`}
                      key={item.id}
                      className="grow w-96"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={0}
                          height={0}
                          sizes="100vw"
                          loading="lazy"
                          // priority={true}
                          className="object-cover w-full 2xl:h-[650px] h-[550px] transition-transform ease-in delay-150 hover:scale-110 duration-1000"
                        />
                      </div>
                      <div className="p-6 absolute bottom-5">
                        <p className="font-medium text-white text-4xl pb-8">
                          {item.name}
                        </p>
                        <Button
                          className="w-48 text-xs bg-white font-bold tracking-wider px-2 rounded-sm"
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

            <div className="my-20 md:my-28 px-4 md:px-12">
              <h2 className="font-normal text-center mb-8 md:mb-20  text-2xl">
                Our Brands
              </h2>
              <div className="flex items-center justify-center flex-wrap gap-8 md:gap-10">
                {dropdownNav[3].category.map((item: any) => {
                  return (
                    <Link
                      href={`/collection${item.link}`}
                      key={item.id}
                      className="relative flex items-center justify-center border border-1 border-gray-200/20 border-solid py-2 px-4"
                    >
                      <img
                        className="w-16 md:w-20 h-16"
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="px-0 md:px-12 bg-gray-100/30">
              <div className="py-16 md:py-20">
                <h2 className="text-center font-normal mb-12 md:mb-20 text-2xl">
                  New Arrivals
                </h2>
                <div className="my-5">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="p-2 md:p-0 grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-8">
                      {latestProduct.map((product: Product, i: number) => {
                        return (
                          <div className="" key={product._id}>
                            <div className="">
                              {i < 4 && (
                                <Card product={product} latestProduct={true} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-center mt-8">
                  <Button
                    onClick={() => router.push("/collection/latest")}
                    variant="contained"
                    className="p-3 font-bold w-64"
                  >
                    SHOP ALL NEW ARRIVALS
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
                    onClick={() => router.push("/collection/sales")}
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

// todo

// you can add carousel for your images
// Add pay with flutterwave and paypal
// work on image optimization, and performances and acessibility
// 
