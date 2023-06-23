/* eslint-disable @next/next/no-img-element */
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
      <div className="mx-8 bg-white py-6 flex justify-between items-start gap-16">
        <div>
          <p className="font-medium">Footwears</p>
          {footwearNav.map((ele: any) => {
            return (
              <Link
                href={`/collection/footwear?category=${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div>
          <p className="font-medium">Apparels</p>
          {apparelNav.map((ele: any) => {
            return (
              <Link
                href={`/collection/apparels?category=${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div>
          <p className="font-medium">Accessories</p>
          {accessoriesNav.map((ele: any) => {
            return (
              <Link
                href={`/collection/accessories?category=${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div>
          <p className="font-medium">Brand</p>
          {brands.map((ele: any) => {
            return (
              <Link
                href={`/collection/${ele.name.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div>
          <p className="font-medium">Collections</p>
          {gender.map((ele: any) => {
            return (
              <Link
                href={`/collection${ele.link.toLowerCase()}`}
                key={ele.id}
                className="my-4 text-sm flex justify-start items-start"
              >
                {ele.name}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-8">
          {collections.map((ele) => {
            return (
              <div key={ele.id} className="my-4">
                <Link
                  href={`/collection${ele.link.toLowerCase()}`}
                  className="hover:no-underline"
                >
                  <img className="w-48 h-48" src={ele.image} alt={ele.name} />
                  <p className="text-center  hover:bg-primary/75  text-white m-auto py-1.5  mt-4 bg-primary  px-4 rounded-sm">
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
      <div onMouseOver={(e) => handleClickOut(e)} className=" px-8 bg-white">
        <div className="max-w-[80em] m-auto flex justify-between items-center">
          <div>
            <Link
              className=" pt-6 pb-4  hover:no-underline border-x-0 border-t-0 hover:border-solid border-b-2 border-primary"
              href={"/"}
            >
              Home
            </Link>
            <div
              ref={ref}
              onMouseOver={(e) => handleClickOver(e)}
              className={`${
                showSubNav ? "border-solid " : "border-none"
              } pt-6 pb-4 relative inline-block ml-6 border-x-0 hover:no-underline border-t-0 border-b-2 border-primary cursor-pointer `}
            >
              Shop
            </div>
          </div>

          <Link className="hover:no-underline" href="/">
            {" "}
            <img
              className="w-8 h-8 2xl:w-20 2xl:h-20"
              src={"/images/sneakerbase-logo.svg"}
              alt="sneaker base logo"
            />{" "}
          </Link>
          <div className="flex items-center ">
            <Link
              href="/login"
              className="pt-6 pb-4 md:mr-8  hover:no-underline border-x-0 border-t-0 hover:border-solid border-b-2 border-primary"
            >
              Login
            </Link>
            <Link
              href="/cart"
              className=" pt-6 pb-4 hover:no-underline border-x-0 border-t-0 hover:border-solid border-b-2 border-primary"
            >
              <div className="flex items-center">
                <span> Cart</span>
                <span className="ml-2 flex items-center justify-center rounded-full w-3 text-sm h-3 p-2 bg-gray-200/40">
                  {cartQty}
                </span>
              </div>
              {/* <AddShoppingCartIcon className="text-xl"/> */}
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
