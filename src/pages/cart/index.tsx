/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { client, titleCase } from "@/utilis";
import { CartResponse, Product } from "@/types";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Link from "next/link";

type Props = {};

function Index({}: Props) {
  const numbers = [0, 1, 2, 3, 4, 5];

  const [products, setProducts] = useState<CartResponse[]>([]);
  const [checkoutAmount, setCheckoutAmount] = useState<Number>();

  useEffect(() => {
    getCartData();
  }, [setProducts]);

  const getCartData = async () => {
    const cartResponse = await client.fetch(`*[_type == "cart"]{
        ...,
        "imageUrl": image.asset->url
      }`);

    cartResponse.sort(function (a: any, b: any) {
      return a._createdAt < b._createdAt ? 1 : -1;
    });
    setProducts(cartResponse);
  };

  // console.log(products);

  const deleteItem = async (id: string) => {
    await client.delete(id).then((res) => {
      if (res) {
        const tempProducts = products.filter((ele) => ele._id !== id);
        setProducts(tempProducts);
      }
    });
  };
  //   const OnChangeQty =(id)=>{

  //   }
  return (
    <div className="px-8 ">
      {products.length ? (
        <div className="py-4">
          <h1 className=" text-center text-lg my-4"> Your Cart</h1>
          <div className="flex gap-4 mt-6 items-start">
            <div className="w-9/12  shadow-lg shadow-dark/10  p-8 ">
              <div className="flex mb-5 text-lg justify-between items-center ">
                <p className="w-[60%]">Product</p>
                <p>Quantity</p>
                <p>Total</p>
              </div>
              <div className="">
                {products.map((ele, index) => {
                  return (
                    <div
                      className="flex justify-between items-center border-t-1 border-b-0 border-x-0 border-primary/20 border-solid py-8 "
                      key={ele._id}
                    >
                      <div className="gap-x-2 flex items-center w-[60%]">
                        <Link href={`product/${ele.productID}`}>
                          <img
                            className="w-36 h-36"
                            src={ele?.image}
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
                            <p className="text-base">
                              Color :{" "}
                              <span className="font-medium">{ele.color}</span>
                            </p>
                            <p className="text-base">
                              Size :{" "}
                              <span className="font-medium">{ele.size}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Autocomplete
                          value={ele.qty}
                          onChange={(event, newValue) => {
                            const currentTodoIndex = products.findIndex(
                              (todo) => todo._id === ele._id
                            );
                            const updatedTodo = Object.assign(
                              {},
                              products[currentTodoIndex]
                            );
                            updatedTodo.qty = Number(newValue);
                            updatedTodo.totalPrice =
                              updatedTodo.qty * ele.price;
                            const newTodos = products.slice();
                            newTodos[currentTodoIndex] = updatedTodo;
                            setProducts(newTodos);
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
                          sx={{ width: 80 }}
                          freeSolo
                          renderInput={(params) => (
                            <TextField {...params} label="qty" />
                          )}
                        />
                        {/* )} */}
                        <div className="mt-3">
                          <div
                            className="cursor-pointer hover:underline"
                            onClick={() => deleteItem(ele._id)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                      <p>${Number(ele.totalPrice)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8 w-3/12 shadow-lg shadow-dark/40 sticky top-20">
              <h2 className="text-lg font-medium">Your Order Info</h2>
              <div className="border-t-1 mt-8 border-b-0 border-x-0 border-solid border-primary/20">
                <div className="text-xl pt-8  mb-4 font-bold flex justify-between items-center">
                  <p>TOTAL :</p>{" "}
                  <p>
                    $
                    {products?.reduce(
                      (accum: any, item: { totalPrice: any }) =>
                        accum + item.totalPrice,
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
      ) : (
        <div className="flex  flex-col h-[28em] items-center justify-center">
          <p className="pb-4">Your cart is empty</p>
          <Button variant="contained" className="px-3 w-64">
            Shop our products
          </Button>
        </div>
      )}
    </div>
  );
}

export default Index;
// don't accept if there exist same item wthe color and size
