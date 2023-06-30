/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useContext, useRef } from "react";
import Link from "next/link";
import {
  accessoriesNav,
  apparelNav,
  footwearNav,
  brands,
  collections,
  gender,
} from "../data";
import { AppContext } from "@/context";
import { AppContextState } from "@/types";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
type Props = {
  showSubNav: boolean;
  setShowSubNav: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ showSubNav, setShowSubNav }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { cartQty } = useContext(AppContext) as AppContextState;

  const handleClickOver = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      setShowSubNav(true);
    }
  };

  const handleClickOut = (e: any) => {
    if (showSubNav && !(ref.current && ref.current.contains(e.target))) {
      setShowSubNav(false);
    }
  };

  const Dropdown = () => {
    return (
      <div className="mx-8 bg-white py-6 flex justify-between items-start">
        <div className="w-10 md:w-full">
          <p className="text-sm md:text-[16px] font-medium">Footwears</p>
          {footwearNav.map((ele: any) => {
            return (
              <Link
                href={`/collection/footwear?category=${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start hover:text-primary"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div className="w-10 md:w-full">
          <p className="text-sm md:text-base font-medium">Apparels</p>
          {apparelNav.map((ele: any) => {
            return (
              <Link
                href={`/collection/apparels?category=${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start hover:text-primary"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div className="w-10 md:w-full">
          <p className="text-sm md:text-base font-medium">Accessories</p>
          {accessoriesNav.map((ele: any) => {
            return (
              <Link
                href={`/collection/accessories?category=${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start hover:text-primary"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div className="w-10 md:w-full">
          <p className="text-sm md:text-base font-medium">Brand</p>
          {brands.map((ele: any) => {
            return (
              <Link
                href={`/collection/${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start hover:text-primary"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex gap-8">
          {collections.map((ele) => {
            return (
              <div key={ele.id} className="my-4">
                <Link
                  href={`/collection${ele.link.toLowerCase()}`}
                  className="hover:no-underline"
                >
                  <img className="w-60 h-60" src={ele.image} alt={ele.name} />
                  <p className="text-center hover:bg-primary/75 text-white m-auto py-1.5 mt-4 bg-primary px-4 rounded-sm">
                    {" "}
                    {ele.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <header className="z-40 fixed w-full bg-white  text-lg 2xl:text-3xl">
      <div className="bg-gray-100 px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex justify-center gap-2 items-center">
          {" "}
          <HeadsetMicOutlinedIcon
            className="flex justify-center items-center"
            sx={{ fontSize: "15px" }}
          />
          <span className="text-xs"> Call us: +31 416 652 803</span>
        </div>
        <div className="text-xs flex gap-2 justify-center items-center">
          {" "}
          <Link  className="hover:text-primary" href={"/"}>Sign In</Link>
          <span>|</span>
          <Link  className="hover:text-primary" href={"/"}>Help</Link>
        </div>
      </div>

      <div onMouseOver={(e) => handleClickOut(e)} className=" px-4 md:px-8 bg-white">
        <div className="text-center max-w-[80em] m-auto flex justify-between items-center">
          <div className="flex gap-8 items-center basis-full">
            <div
              ref={ref}
              onMouseOver={(e) => handleClickOver(e)}
              className={`${
                showSubNav ? "border-solid " : "border-none"
              } py-4 relative inline-block border-x-0 hover:no-underline border-t-0 border-b-2 border-primary cursor-pointer `}
            >
              Shop
            </div>
            <div className="hidden md:block py-4 ">
              {gender.map((ele: any) => {
                return (
                  <Link
                    href={`/collection${ele.link.toLowerCase()}`}
                    key={ele.id}
                    className="py-4 md:mr-8 hover:no-underline border-x-0 border-t-0 hover:border-solid border-b-2 border-primary"
                  >
                    {ele.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            className="flex items-center justify-center hover:no-underline basis-full"
            href="/"
          >
            {" "}
            <img
              className=" w-6 md:w-10 h-10 2xl:w-20 2xl:h-20"
              src={"/images/sneakerbase-logo.svg"}
              alt="sneaker base logo"
            />{" "}
          </Link>
          <div className="flex items-center justify-end basis-full text-right gap-4">
            <Link
              href="/login"
              className="hover:bg-gray-500/20 rounded-full p-2 flex justify-center items-center hover:no-underline"
            >
              <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
            </Link>

            <Link
              href="/cart"
              className="relative hover:bg-gray-500/20 rounded-full p-2 flex justify-center items-center hover:no-underline"
            >
              <span className="relative flex items-center justify-center text-center">
                {" "}
                <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
              </span>
              <span className="absolute top-0 left-4 ml-2 rounded-full w-3 font-bold text-sm h-3 ">
                {cartQty}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="top-0"
        onMouseOut={() => setShowSubNav(false)}
        onMouseOver={() => setShowSubNav(true)}
      >
        {showSubNav && <Dropdown />}
      </div>
    </header>
  );
}
