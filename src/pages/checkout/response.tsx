/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Link from "next/link";
import { createCartReceiptRequest } from "@/utilis/checkout";
import { AppContextState } from "@/types";
import { AppContext } from "@/context";

export default function Response() {
  const router = useRouter();
  const [isSuccess, setSuccess] = useState(false);
  const { setCartQtyhandler } = useContext(AppContext) as AppContextState;

  useEffect(() => {
    let cartID = localStorage.getItem("cartID") || "";
    let response: string | any = router.query;
    if (response.success) {
      createReceipt(cartID);
      setSuccess(true);
    }
  }, [router.query]);

  const createReceipt = async (cartId: string) => {
    try {
      let response = await createCartReceiptRequest(cartId);
      let data = await response.json();
      localStorage.setItem("cart", JSON.stringify([]));
      setCartQtyhandler(null);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen px-8 font-medium text-center flex flex-col items-center justify-center ">
      {isSuccess ? (
        <div className="">
          <div className="m-auto border border-success border-2 border-solid h-16 w-16 rounded-full flex flex-col items-center justify-center ">
            <CheckIcon className="text-5xl text-success font-thin" />
          </div>
          <h1 className="text-xl mt-6 ">Thank you for your Purchase!</h1>
          <p className="text-center text-dark">
            Check your mail for order details and tracking Info
          </p>
          <div className="text-center mt-6">
            <Button onClick={() => router.push("/")} variant="contained">
              Continue Shopping
            </Button>
          </div>

          <p className="my-16">
            {" "}
            You can
            <Link className="text-primary" href={"/login"}>
              {" "}
              login
            </Link>{" "}
            or{" "}
            <Link href={"/signup"} className="text-primary">
              create an account
            </Link>{" "}
            to track order status
          </p>
        </div>
      ) : (
        <div className="text-center">
          {" "}
          <div className="m-auto border border-error border-2 border-solid h-16 w-16 rounded-full flex flex-col items-center justify-center ">
            <CloseOutlinedIcon className="text-3xl text-error font-thin" />
          </div>
          <h1 className="my-4 text-3xl">Payment Cancelled</h1>
          <Link href={"/cart"} className="text-primary underline">
            Back to cart
          </Link>
        </div>
      )}
    </div>
  );
}

Response.getLayout = (page: ReactElement) => page;
