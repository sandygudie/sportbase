/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import Link from "next/link";
import { dropdownNav, sales_latest_collections, gender } from "../data";
import { AppContext } from "@/context";
import { AppContextState } from "@/types";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SideNav from "./SideNav";
import Button from "@mui/material/Button";
import useScroll from "@/hooks/useScroll";
import Image from "next/legacy/image";

export default function Navbar() {
  const { cartQty, showSubNavHandler, showSubNav } = useContext(
    AppContext
  ) as AppContextState;

  const scrollTop = useScroll();

  const Dropdown = () => {
    return (
      <div className="mx-8 py-6 block md:flex justify-between items-start">
        <div className="flex justify-between items-start w-11/12">
          {dropdownNav.map((list: any) => {
            return (
              list.name !== "Gender" && (
                <div key={list.id} className="w-10 sm:w-full">
                  <Link
                    type="button"
                    href={`/collection/${list.name.toLowerCase()}`}
                    className="text-sm md:text-[16px] font-medium"
                  >
                    {list.name}
                  </Link>
                  {list.category.map((ele: any) => {
                    return (
                      <Link
                        type="button"
                        href={
                          list.name === "Brand"
                            ? `/collection/${ele.link.toLowerCase()}`
                            : `/collection/${list.name.toLowerCase()}?category=${ele.name
                                .split(" ")
                                .join("")
                                .toLowerCase()}`
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
        <div className="flex">
          {sales_latest_collections.map((ele) => {
            return (
              <Link
                href={`/collection${ele.link.toLowerCase()}`}
                key={ele.id}
                className="m-4 text-right"
              >
                <Image
                  src={ele.image}
                  alt={ele.name}
                  placeholder="blur"
                  blurDataURL="https://my-company-images-prd.imgix.net/public/bg-desktop.png?auto=format&blur=200&px=24"
                  width={0}
                  loading="lazy"
                  height={0}
                  sizes="100vw"
                  className="object-cover w-full h-64"
                />
                <Button
                  className="w-60 text-sm mt-2 bg-white font-medium tracking-wider px-2 rounded-sm"
                  variant="contained"
                >
                  {" "}
                  {ele.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <header
      className={` z-40 w-full bg-white sticky top-0 text-lg 2xl:text-3xl shadow-md`}
    >
      <div
        onMouseOver={() => showSubNavHandler(false)}
        className={`${
          scrollTop > 0 ? "hidden" : "flex"
        } bg-gray-100 px-2 md:px-8 py-3  items-center justify-between`}
      >
        <div className="flex justify-center gap-2 items-center">
          {" "}
          <HeadsetMicOutlinedIcon
            className="flex justify-center items-center"
            sx={{ fontSize: "15px" }}
          />
          <span className="text-xs"> Call us: +1 987 692 5823</span>
        </div>
        <div className="text-xs flex md:gap-2 justify-center items-center">
          {" "}
          {/* <Link className="hover:text-primary" href={"/"}>
          sportbase@gmail.com
          </Link>
          <span>|</span> */}
          <Link className="hover:text-primary" href={"/"}>
            Help Center
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className={`px-2  py-4 md:px-8 bg-white`}>
          <div className="text-center m-auto flex justify-between items-center">
            <div className="hidden md:flex gap-8 items-center basis-full">
              <Link
                href={"/"}
                onMouseOver={() => showSubNavHandler(true)}
                className={`relative no-underline hover:text-primary inline-block cursor-pointer`}
              >
                Shop
              </Link>
              <div
                onMouseOver={() => showSubNavHandler(false)}
                className="hidden md:block"
              >
                {gender.map((ele: any) => {
                  return (
                    <Link
                      href={`/collection${ele.link.toLowerCase()}`}
                      key={ele.id}
                      className="pb-6 md:mr-8 hover:text-primary hover:no-underline border-x-0 border-t-0 hover:border-solid border-b-2 border-primary"
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
                className="w-10 md:w-16 h-10 2xl:w-20 2xl:h-20"
                src={"/images/sneakerbase-logo.svg"}
                alt="sneaker base logo"
              />{" "}
            </Link>
            <div className="flex items-center justify-end basis-full text-right md:gap-4">
              <Link
                aria-label="favorite collection"
                href="/login"
                className="hover:bg-gray-500/20 rounded-full p-2 flex justify-center items-center hover:no-underline"
              >
                <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
              </Link>

              <Link
                aria-label="cart"
                href="/cart"
                className="relative hover:bg-gray-500/20 rounded-full p-2 flex justify-center items-center hover:no-underline"
              >
                <span className="relative flex items-center justify-center text-center">
                  {" "}
                  <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                </span>
                <span className="absolute top-0 left-4 ml-2 rounded-full w-3 font-bold text-sm h-3">
                  {cartQty > 0 ? cartQty : ""}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute  bg-white  w-full z-40 top-14 shadow-md"
          onMouseOut={() => showSubNavHandler(false)}
          onMouseOver={() => showSubNavHandler(true)}
        >
          {showSubNav && <Dropdown />}
        </div>
      </div>
    </header>
  );
}
