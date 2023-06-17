import { Button } from "@mui/material";
import Link from "next/link";
// import sneakerLogo from "../../assets/sneakerbase-logo.svg";
export default function Footer() {
  return (
    <footer className="text-lg ">
      
    <div className="bg-gray-100 py-16 px-6 md:px-12 flex flex-wrap items-start justify-around gap-8 ">
        <div className="shrink">
            <p className="text-base pb-6 font-medium">Newsletter</p>
            <p className="text-base">Subscribe to receive updates, access to exclusive deals, and more.</p>
           <div className="my-5">
           <input className="p-4 w-full focus:outline-primary" type="email"  placeholder="Enter your email address"/>
           </div>
            <Button variant="contained" className="py-3 w-[150px]">Subscribe</Button>
        </div>
        <div className="shrink">
            <p className="font-medium text-base  pb-4">Here To Help</p>
            <div className="text-sm flex flex-col gap-5 justify-start">
                <Link href="/">Contact us</ Link>
                <Link  href="/">FAQs</Link >
                <Link href="/">Advice before you buy</Link >
            </div>

        </div>
        <div  className="" >
            <p className="font-medium  text-base pb-4">More Information</p>
            <div className="text-sm flex flex-col gap-5 justify-start">
                <Link href="/">Delivery and Collection</ Link>
                <Link href="/">Tracking orders</ Link>
                <Link href="/">Gift Card</Link >
            </div>
        </div>
    </div>
      <div className="bg-dark p-8 text-white gap-4 text-xs flex items-center justify-center">
        <Link href="/">Privacy</Link>|
        <Link href="/">Terms</Link>|
        <Link href="/">Refund Policy</Link>|
        <Link href="/">Legal</Link>|
        {/* <a href="/">Acessibility</a> */}
      </div>
    </footer>
  );
}
