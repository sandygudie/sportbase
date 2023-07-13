/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import {
  deleteCartProduct,
  getCartProducts,
  updateCartProduct,
} from "@/utilis/cart";
import { AppContextState, CartResponse, Product } from "@/types";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "@/context";

type Props = {};

function Index({}: Props) {
  const numbers = [0, 1, 2, 3, 4, 5];

  const [products, setProducts] = useState<CartResponse[]>([]);
  const [isDelete, setDelete] = useState<Boolean>(false);
  const [selectedID, setSelectedID] = useState<string>("");
  const { setCartQty } = useContext(AppContext) as AppContextState;

  useEffect(() => {
    let cartItem = JSON.parse(localStorage.getItem("cart") || "[]");
    let cartID = localStorage.getItem("cartID");
    getCartData(cartItem, cartID);
  }, [setProducts]);

  // get product from localstorage , if it's not there get from api
  const getCartData = async (cartItem: any, cartID: any) => {
    try {
      if (cartItem.length <= 0) {
        if (cartID) {
          await getCartProducts(cartID)
            .then((response) => response.json())
            .then((data) => {
              let cartResponse = data.data.product;
              cartResponse.sort(function (a: any, b: any) {
                return a.updated_at < b.updated_at ? 1 : -1;
              });
              localStorage.setItem("cart", JSON.stringify(cartResponse));
            });
          setProducts(cartItem);
        }
      }
      setProducts(cartItem);
    } catch (error) {
      console.log(error);
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
      const tempProducts = products.filter((ele) => ele._id !== id);
      localStorage.setItem("cart", JSON.stringify(tempProducts));
      setProducts(tempProducts);
      setCartQty(tempProducts.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" px-5 md:px-8 ">
      {products.length ? (
        <div className="py-4">
          <h1 className=" text-center text-lg my-4"> Your Cart</h1>
          <div className="block md:flex gap-4 mt-6 items-start">
            <div className="w-full md:w-9/12 md:shadow-lg shadow-dark/10 md:p-8 ">
              <div className="flex mb-5 text-lg justify-between items-center ">
                <p className="w-[50%]">Product</p>
                <p className="sm:w-1/3 hidden sm:block">Quantity</p>
                <p className="hidden sm:block">Total</p>
              </div>
              <div className="">
                {products.map((ele, index) => {
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
                      <div className="mt-3 w-3/6">
                        <Autocomplete
                          value={ele.qty}
                          onChange={(event, newValue) => {
                            const currentProductIndex = products.findIndex(
                              (product) => product._id === ele._id
                            );
                            const updatedProduct = Object.assign(
                              {},
                              products[currentProductIndex]
                            );
                            updatedProduct.qty = Number(newValue);
                            updatedProduct.totalPrice =
                              updatedProduct.qty * ele.price;
                            const newProducts = products.slice();
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
                            setProducts(newProducts);
                          }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          id="free-solo-with-text-demo"
                          options={numbers}
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
                        {/* )} */}
                        
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
              <div className="border-t-1 mt-2 md:mt-8 border-b-0 border-x-0 border-solid border-primary/20">
                <div className="md:text-sm lg:text-xl pt-8  mb-6 font-bold flex flex-wrap justify-between items-center">
                  <p>TOTAL :</p>{" "}
                  <p>
                    $
                    {products?.reduce(
                      (accum: any, item: { totalPrice: any }) =>
                        accum + Number(item.totalPrice),
                      0
                    )}
                    .00
                  </p>
                </div>
                <Button variant="contained" className="w-full">
                  Go to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : products.length <= 0 ? (
        <div className="flex flex-col h-[28em] items-center justify-center">
          <p className="pb-4">Your cart is empty</p>
          <Button variant="contained" className="px-3 w-64">
            Shop our products
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Index;

