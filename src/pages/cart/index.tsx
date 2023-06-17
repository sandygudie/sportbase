/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { client, deleteProduct, titleCase } from "@/utilis";
import { CartResponse, Product } from "@/types";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type Props = {};

function Index({}: Props) {
  const [products, setProducts] = useState<CartResponse[]>([]);
  useEffect(() => {
    getCartData();
  }, []);
  const getCartData = async () => {
    const cartResponse = await client.fetch(`*[_type == "cart"]{
        ...,
        "imageUrl": image.asset->url
      }`);
    setProducts(cartResponse);
  };
  console.log(products);
  const deleteItem = async (id: string) => {
    const res = await deleteProduct(id);
    // if (res.name) {
    //   const tempProducts = products.filter((ele) => ele._id !== id);
    //   setProducts(tempProducts);
    // }
  };
  return (
    <div className="px-8 ">
      {products.length ? (
        <div className="py-4">
          <h1 className=" text-center text-lg my-4"> Your Cart</h1>
          <div className="flex gap-4 mt-6 items-start">
            <div className="w-9/12  shadow-lg shadow-dark/10  p-8 ">
              <div className="flex mb-5 text-lg justify-between items-center ">
                <p className="w-1/2">Product</p>
                <p>Quantity</p>
                <p>Total</p>
              </div>
              <div className="">
                {products.map((ele) => {
                  return (
                    <div
                      className="flex justify-between items-center border-t-1 border-b-0 border-x-0 border-primary/20 border-solid py-8 "
                      key={ele._id}
                    >
                      <div className="gap-x-2 flex items-center w-1/2">
                        <img
                          className="w-36 h-36"
                          src={ele?.image}
                          alt={ele.name}
                        />
                        <div>
                          <p className="text-xs font-medium mb-4">
                            {ele.category.toUpperCase()}
                          </p>
                          <p className="font-bold">{ele.name}</p>
                          <p className="font-medium">{ele.price}</p>
                          <div className="mt-8">
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
                          disablePortal
                          defaultValue={1}
                          id="combo-box-demo"
                          options={[1, 2, 3, 4, 5, 6]}
                          sx={{ width: 80 }}
                          renderInput={(params) => (
                            <TextField {...params} label="qty" />
                          )}
                        />
                        <div className="mt-3">
                          <div
                            className="cursor-pointer hover:underline"
                            onClick={() => deleteItem(ele._id)}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                      <p>{ele.price}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8 w-3/12 shadow-lg shadow-dark/40 sticky top-20">
              <h2 className="text-lg font-medium">Your Order Info</h2>
              <div className="border-t-1 mt-8 border-b-0 border-x-0 border-solid border-primary/20">
                <div className="text-xl pt-8  mb-4 font-bold flex justify-between items-center">
                  <p>TOTAL :</p> <p>$12345</p>
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
