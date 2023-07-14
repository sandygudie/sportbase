/* eslint-disable @next/next/no-img-element */
import { Dispatch, SetStateAction, useContext, useRef } from "react";
import Link from "next/link";
import { dropdownNav, collections, gender } from "../data";
import { AppContext } from "@/context";
import { AppContextState } from "@/types";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SideNav from "./SideNav";
import Button from "@mui/material/Button";
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
      <div className="mx-8 bg-white py-6 block md:flex justify-between items-start">
        <div className="flex justify-between items-start w-4/5">
          {dropdownNav.map((list: any) => {
            return (
              list.name !== "Gender" && (
                <div key={list.id} className="w-10 sm:w-full">
                  <p className="text-sm md:text-[16px] font-medium">
                    {list.name}
                  </p>
                  {list.category.map((ele: any) => {
                    return (
                      <Link
                        href={
                          list.name === "Brand"
                            ? `/collection/${ele.name.toLowerCase()}`
                            : `/collection/${list.name.toLowerCase()}?category=${ele.name.toLowerCase()}`
                        }
                        key={ele.id}
                        className="my-4 text-sm flex justify-start items-start hover:text-primary"
                      >
                        {ele.name}
                      </Link>
                    );
                  })}
                </div>
              )
            );
          })}
        </div>
        <div className="block sm:flex gap-8">
          {collections.map((ele) => {
            return (
              <div key={ele.id} className="my-4">
                <Link
                  href={`/collection${ele.link.toLowerCase()}`}
                  className="hover:no-underline"
                >
                  <img
                    className="w-48 h-48 md:w-48 md:h-60"
                    src={ele.image}
                    alt={ele.name}
                  />
                  <Button
                    className="w-48 text-sm bg-white font-medium tracking-wider px-2 rounded-sm"
                    variant="contained"
                  >
                    {" "}
                    {ele.name}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <header className="z-40 fixed w-full bg-white text-lg 2xl:text-3xl">
      <div className="bg-gray-100 px-2 md:px-8 py-3 flex items-center justify-between">
        <div className="flex justify-center gap-2 items-center">
          {" "}
          <HeadsetMicOutlinedIcon
            className="flex justify-center items-center"
            sx={{ fontSize: "15px" }}
          />
          <span className="text-xs"> Call us: +31 416 652 803</span>
        </div>
        <div className="text-xs flex md:gap-2 justify-center items-center">
          {" "}
          <Link className="hover:text-primary" href={"/"}>
            Sign In
          </Link>
          <span>|</span>
          <Link className="hover:text-primary" href={"/"}>
            Help
          </Link>
        </div>
      </div>

      <div
        onMouseOver={(e) => handleClickOut(e)}
        className=" px-2 md:px-8 bg-white"
      >
        <div className="text-center m-auto flex justify-between items-center">
          <div className="hidden md:flex gap-8 items-center basis-full">
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
          <SideNav />

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
          <div className="flex items-center justify-end basis-full text-right md:gap-4">
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
