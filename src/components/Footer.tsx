/* eslint-disable @next/next/no-img-element */
import { Button } from "@mui/material";
import Link from "next/link";
import Image from 'next/image'
 

export default function Footer() {
  return (
    <footer className="text-lg w-full bg-gray-100 ">
      <div className=" gap-4 md:gap-0 justify-center pt-16 px-6 md:px-12 flex  flex-col md:flex-row flex-wrap items-start md:justify-around">
        <div className="md:w-1/4">
          <p className="font-medium mb-2">Newsletter</p>
          <p className="">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="my-4">
            <input
              className="p-4 w-52 placeholder:text-xs rounded-lg border-[1px] outline-0 focus:border-primary"
              type="email"
              placeholder={"Enter your email address"}
            />
          </div>
          <Button variant="contained" className="py-3 w-full md:w-[150px]">
            Subscribe
          </Button>
        </div>
        <div className="shrink">
          <p className="font-medium  pb-2">Need Help</p>
          <div className="text-sm flex flex-col gap-3 justify-start">
            <p>Call us: +1 987 692 5823</p>
            <p>24 hrs available</p>
            <p>sportbase@gmail.com</p>
          </div>
        </div>
        <div className="shrink">
          <p className="font-medium  pb-2">Here To Help</p>
          <div className="text-sm flex flex-col gap-5 justify-start">
            <Link className="hover:text-primary" href="/">
              Contact us
            </Link>
            <Link className="hover:text-primary" href="/">
              About us
            </Link>
            <Link className="hover:text-primary" href="/">
              FAQs
            </Link>
            <Link className="hover:text-primary" href="/">
              Blog
            </Link>
          </div>
        </div>
        <div className="">
          <p className="font-medium pb-2">More Information</p>
          <div className="text-sm flex flex-col gap-5 justify-start">
            <Link className="hover:text-primary" href="/">
              Sell on SportBase
            </Link>
            <Link className="hover:text-primary" href="/">
              Merchant Terms & Conditions
            </Link>
            <Link className="hover:text-primary" href="/">
              Affiliate
            </Link>
          </div>
        </div>
        <div className="">
          <p className="font-medium pb-2">Partner with us</p>
          <div className="text-sm flex flex-col gap-5 justify-start">
            <Link className="hover:text-primary" href="/">
              Delivery and Collection
            </Link>
            <Link className="hover:text-primary" href="/">
              Tracking orders
            </Link>
            <Link className="hover:text-primary" href="/">
              Gift Card
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center flex flex-wrap justify-center gap-4 py-8 items-center">
      <Image
      src="/images/brand-logo/stripe.svg"
      width={80}
      height={80}
      alt="stripe"
    />
     <Image
      src="/images/brand-logo/flutterwave.svg"
      width={150}
      height={150}
      alt="flutterwave"
    />
     <Image
      src="/images/brand-logo/paypal.svg"
      width={80}
      height={80}
      alt="paypal"
    />
        {/* <img  className="w-16 " src="/images/brand-logo/stripe.svg" alt="stripe"/>
        <img  className="w-32" src="/images/brand-logo/flutterwave.svg" alt="flutterwave"/>
        <img  className="w-20" src="/images/brand-logo/paypal.svg" alt="paypal"/> */}
      </div>
      <div className="bg-dark p-8 text-white gap-4 text-xs flex items-center justify-center">
        <Link href="/">Privacy</Link>|<Link href="/">Terms and Condition</Link>|
        <Link href="/">Refund Policy</Link>
      </div>
    </footer>
  );
}
