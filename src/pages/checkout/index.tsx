/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { CartResponse } from "@/types";
import Link from "next/link";
import React, { ReactElement, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { getStripe } from "@/utilis/getStripe";
import FlutterwavePayment from "@/components/FlutterwavePayment";
import Spinner from "@/components/Spinner";

const Checkout = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [paymentMethod, setpayMethod] = useState<
    "flutterwave" | "none" | "stripe" | "paypal"
  >("none");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!item.length) {
      router.push("/cart");
    }
    setCartItems(item);
  }, []);

  const checkoutCart = async () => {
    setLoading(true);
    setpayMethod("stripe");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      if ((response as any).statusCode === 500) {
        console.error(response);
        return;
      }
      const session = await response.json();
      const stripe = await getStripe();

      await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  let paymentOptions = [
    {
      id: 0,
      name: "stripe",
      image: "/images/brand-logo/stripe.png",
      selected: () => checkoutCart(),
      color: "bg-[#d4cdcd80]",
    },
    {
      id: 1,
      name: "flutterwave",
      image: "/images/brand-logo/flutterwave.png",
      selected: () => setpayMethod("flutterwave"),
      color: "bg-[#009688]",
    },
    {
      id: 2,
      name: "paypal",
      image: "/images/brand-logo/paypal.webp",
      selected: () => "",
      color: "bg-[#ffc43a]",
    },
  ];
  const totalamount: number = cartItems?.reduce(
    (accum: any, item: { totalPrice: any }) => accum + Number(item.totalPrice),
    0
  );

  return (
    <>
      <Head>
      <title>Sportbase</title>
      </Head>
      <div className="h-screen flex flex-col-reverse sm:grid grid-cols-2">
        <div className="h-full">
          {paymentMethod !== "flutterwave" ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Link className="" href="/">
                {" "}
                <img
                  className="w-10 sm:w-16 h-10 2xl:w-20 2xl:h-20"
                  src={"/images/sneakerbase-logo.svg"}
                  alt="sneaker base logo"
                />{" "}
              </Link>
              <p className="mt-8 mb-3 text-gray-200 text">Express checkout</p>
              <div className="text-center flex w-2/3 flex-wrap justify-center gap-4 items-center">
                {paymentOptions.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={option?.selected}
                    className={`${option.color} border-0  rounded-lg  w-48 h-12 cursor-pointer flex flex-col justify-center items-center py-2`}
                  >
                    {isLoading && paymentMethod === option.name ? (
                      <Spinner />
                    ) : (
                      <img
                        className="w-20"
                        src={option.image}
                        alt={option.name}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <FlutterwavePayment totalamount={totalamount} />
          )}
        </div>

        <div className="bg-[#efefef] h-1/2 sm:h-full overflow-y-auto px-6 py-12 sm:px-16 sm:pt-12">
          {cartItems.map((ele: CartResponse) => (
            <div
              key={ele._id}
              className="flex mb-2 justify-between items-center"
            >
              <div className="relative">
                <p className="absolute h-5 w-5 -top-3 bg-gray-200/70 z-20 rounded-full text-center right-0 text-sm">
                  {ele.qty}
                </p>
                <Image
                  src={ele?.imageUrl}
                  alt={ele.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover rounded-xl w-16 h-14"
                />
              </div>
              <p className="text-xl">${ele.price}</p>
            </div>
          ))}
          <div className="bloc sm:flex items-center mt-4 md:mt-12 justify-between">
            <input
              type="text"
              className="w-36 sm:w-72 px-6 py-4 outline-0 border-gray-200 focus:border-primary border-solid rounded-md border-[1px] placeholder:text-xs"
              placeholder="Gift card or discount code"
            />
            <Button variant="contained" className="h-12 opacity-20">
              Apply
            </Button>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl">Total</p>
            <p className="text-lg font-bold ">
              <span className="text-xs text-gray-200">USD </span>${totalamount}
              .00
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Checkout.getLayout = (page: ReactElement) => page;

export default Checkout;
