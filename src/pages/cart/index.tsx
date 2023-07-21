/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import {
  deleteCartProduct,
  getCartProducts,
  updateCartProduct,
} from "@/utilis/cart";
import { AppContextState, CartResponse } from "@/types";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "@/context";
import { getStripe } from "@/utilis/getStripe";
import { useRouter } from "next/router";

type Props = {};

function Index({}: Props) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [isDelete, setDelete] = useState<Boolean>(false);
  const [selectedID, setSelectedID] = useState<string>("");
  const { setCartQtyhandler } = useContext(AppContext) as AppContextState;
  const [isLoading, setLoading] = useState<boolean>(false);

  // let cartItem = JSON.parse(localStorage.getItem("cart") || "[]");
  useEffect(() => {
    setLoading(true);
    getCartData();
  }, []);

  const getCartData = async () => {
    let cartItem = JSON.parse(localStorage.getItem("cart") || "[]");
    let cartID = localStorage.getItem("cartID");
    try {
      if (!cartItem.length) {
        if (cartID) {
          let response = await getCartProducts(cartID);
          let data = await response.json();
          let cartResponse = data.data.product;
          cartResponse.sort(function (a: any, b: any) {
            return a.updated_at < b.updated_at ? 1 : -1;
          });
          localStorage.setItem("cart", JSON.stringify(cartResponse));
          setCartItems(cartResponse);
        }
      }
      setCartItems(cartItem);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, itemUpdated: any) => {
    try {
      let cartID = localStorage.getItem("cartID");
      await updateCartProduct(cartID, id, itemUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setSelectedID(id);
      setDelete(true);
      let cartID = localStorage.getItem("cartID");
      await deleteCartProduct(cartID, id);
      const tempProducts = cartItems.filter((ele) => ele._id !== id);
      localStorage.setItem("cart", JSON.stringify(tempProducts));
      setCartItems(tempProducts);
      setCartQtyhandler(tempProducts.length);
    } catch (error) {
      console.log(error);
    }
  };
  const checkoutCart = async () => {
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

  return (
    <div className=" px-5 md:px-8 ">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      ) : !cartItems.length ? (
        <div className="flex flex-col h-[28em] items-center justify-center">
          <p className="pb-4">Your cart is empty</p>
          <Button
            onClick={() => router.push("/")}
            variant="contained"
            className="px-3 w-64"
          >
            Go to Shop
          </Button>
        </div>
      ) : (
        <div className="py-4">
          <h1 className=" text-center tracking-[0.3em] font-light text-xl my-6">
            {" "}
            CART
          </h1>
          <div className="block md:flex gap-4 mt-6 items-start">
            <div className="w-full md:w-9/12 md:shadow-lg shadow-dark/10 md:p-8 ">
              <div className="flex mb-5 text-lg justify-between items-center ">
                <p className="w-[50%]">Product</p>
                <p className="sm:w-1/3 hidden sm:block">Quantity</p>
                <p className="hidden sm:block">Total</p>
              </div>
              <div className="">
                {cartItems.map((ele, index) => {
                  return (
                    <div
                      className="sm:flex justify-between items-center border-t-1 border-b-0 border-x-0 border-primary/20 border-solid py-8 "
                      key={ele._id}
                    >
                      <div className="w-full gap-x-2 flex items-center sm:w-[40%]">
                        <Link href={`product/${ele.productID}`}>
                          <img
                            className=" w-28 h-28 md:w-36 md:h-36"
                            src={ele?.imageUrl}
                            alt={ele.name}
                          />
                        </Link>

                        <div>
                          <p className="text-xs font-medium mb-4">
                            {ele.category.toUpperCase()}
                          </p>
                          <p className="text-sm font-bold">{ele.name}</p>
                          <p className="text-sm font-bold">${ele.price}</p>
                          <div className="mt-4">
                            <p className="text-sm md:text-base">
                              Color :{" "}
                              <span className="font-medium">{ele.color}</span>
                            </p>
                            <p className="text-sm md:text-base">
                              Size :{" "}
                              <span className="font-medium">{ele.size}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-[45%] mt-4 :my-6 md:my-0 block sm:flex items-center justify-between gap-3">
                        <div className="mt-3 sm:w-3/6">
                          <Autocomplete
                            value={ele.qty}
                            onChange={(event, newValue) => {
                              const currentProductIndex = cartItems.findIndex(
                                (product) => product._id === ele._id
                              );
                              const updatedProduct = Object.assign(
                                {},
                                cartItems[currentProductIndex]
                              );
                              updatedProduct.qty = Number(newValue);
                              updatedProduct.totalPrice =
                                updatedProduct.qty * ele.price;
                              const newProducts = cartItems.slice();
                              newProducts[currentProductIndex] = updatedProduct;
                              const itemUpdated = {
                                qty: updatedProduct.qty,
                                price: updatedProduct.price,
                                totalPrice:
                                  updatedProduct.qty * updatedProduct.price,
                              };
                              updateItem(ele._id, itemUpdated);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(newProducts)
                              );
                              setCartItems(newProducts);
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text-demo"
                            options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                            getOptionLabel={(option) => option.toString()}
                            renderOption={(props, option) => (
                              <li {...props}>{option}</li>
                            )}
                            className="md:w-6/6 lg:w-full"
                            freeSolo
                            renderInput={(params) => (
                              <TextField {...params} label="qty" />
                            )}
                          />

                          <div
                            className="text-sm md:text-base cursor-pointer text-center hover:underline"
                            onClick={() => deleteItem(ele._id)}
                          >
                            {isDelete && selectedID === ele._id ? (
                              <CircularProgress
                                className="text-gray-500"
                                color="success"
                                size={20}
                              />
                            ) : (
                              "Remove"
                            )}
                          </div>
                        </div>
                        <p className="font-medium my-4 md:my-0">
                          {" "}
                          <span className="mr-5 sm:hidden ">Total price:</span>$
                          {Number(ele.totalPrice)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full p-0 md:p-8 md:w-3/12 md:shadow-lg shadow-dark/40 md:sticky top-20">
              <h2 className="text-lg font-medium">Your Order Info</h2>
              <div className="border-t-1 mt-2 md:mt-4 border-b-0 border-x-0 border-solid border-primary/20">
                <div className="md:text-sm lg:text-xl pt-8  mb-6 font-bold flex flex-wrap justify-between items-center">
                  <p>TOTAL :</p>{" "}
                  <p className="text-xl">
                    $
                    {cartItems?.reduce(
                      (accum: any, item: { totalPrice: any }) =>
                        accum + Number(item.totalPrice),
                      0
                    )}
                    .00
                  </p>
                </div>
                <Button
                  onClick={() => checkoutCart()}
                  variant="contained"
                  className="w-full"
                >
                  CHECKOUT
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
