/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { configFlutterwave } from "../utilis/flutterwaveConfig";
import { Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useRouter } from "next/router";
import Link from "next/link";
import Spinner from "./Spinner";

interface IProps {
  totalamount: number;
}
export default function FlutterwavePayment({ totalamount }: IProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleFlutterPayment = useFlutterwave(
    configFlutterwave(totalamount, name, email, phone)
  );

  return (
    <div className="my-4 flex text-center flex-col justify-center items-center h-full">
      <Link className="" href="/">
        {" "}
        <img
          className="w-10 md:w-16 h-10 2xl:w-20 2xl:h-20"
          src={"/images/sneakerbase-logo.svg"}
          alt="sneaker base logo"
        />{" "}
      </Link>
      <form
        onSubmit={(event) => {
          event?.preventDefault();
          setLoading(true);
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              if (response.status === "successful") {
                router.push("/checkout/response?success=true");
              } else {
                router.push("/checkout/response?canceled=true");
              }
              closePaymentModal();
            },
            onClose: () => {},
          });
        }}
        className="sm:m-8 flex flex-col gap-4"
      >
        <div className="relative w-fit mx-auto">
          <PersonOutlineIcon className="text-gray-200 text-[20px] absolute top-4 left-3 z-20" />
          <input
            className="w-fit sm:w-64 pr-6 pl-12 py-4 outline-0 border-gray-400/20 focus:border-primary border-solid  rounded-md border-[1px] placeholder:text-xs "
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="relative w-fit mx-auto">
          <EmailIcon className=" text-gray-200 text-[20px] absolute top-4 left-3 z-20" />
          <input
            className="w-fit sm:w-64 pr-6 pl-12 py-4 outline-0 border-gray-400/20 focus:border-primary border-solid  rounded-md border-[1px] placeholder:text-xs "
            type="text"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative w-fit mx-auto">
          <LocalPhoneIcon className=" text-gray-200 text-[20px] absolute top-4 left-3 z-20" />
          <input
            className="w-fit sm:w-64 pr-6 pl-12 py-4 outline-0 border-gray-400/20 focus:border-primary border-solid  rounded-md border-[1px] placeholder:text-xs "
            type="text"
            placeholder="Phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="relative w-fit mx-auto">
          <AttachMoneyIcon className=" text-gray-200 text-[20px] absolute top-4 left-3 z-20" />
          <input
            type="number"
            className="w-fit sm:w-64 pr-6 pl-12 py-4 outline-0 border-gray-400/20 focus:border-primary border-solid  rounded-md border-[1px]"
            placeholder="Amount"
            // defaultValue={totalamount}
            required
            readOnly
            value={totalamount}
          />
        </div>
        <div className="mt-6">
          <Button type="submit" className="w-fit md:w-64" variant="contained">
            {isLoading ? (
              <Spinner />
            ) : (
              <span className="sm:flex items-center">
                <p className="text-xs">Continue with </p>
                <img
                  className="w-20 sm:w-32"
                  src="/images/brand-logo/flutterwave.svg"
                  alt="flutterwave"
                />
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
