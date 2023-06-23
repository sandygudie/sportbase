import { AppContextState, CartRequest, CartResponse, Product } from "@/types";
import { client, titleCase } from "@/utilis";
import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import { AppContext } from "@/context";

type Props = {
  product: Product;
  similarProducts: Product[];
};

function Index({ product, similarProducts }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>(" ");
  const [selectedSize, setSelectedSize] = useState<string>(" ");

  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const { setCartQty} = useContext(AppContext) as AppContextState;
  function addToCart(doc: Product) {
    if ((selectedColor || selectedColor) === " ") {
      setError(true);
    } else {
      setError(false);
      const cartProduct: CartRequest = {
        _type: "cart",
        name: doc.name,
        color: selectedColor,
        size: selectedSize,
        category: product._type,
        image: product.imageUrl,
        price: product.price,
        productID: product._id,
        qty: 1,
        totalPrice: Number(product.price),
      };
      let cartItem = JSON.parse(localStorage.getItem("cart") || "[]");
      let isProductExisting = cartItem.find(
        (ele: CartResponse) =>
          ele.color === cartProduct.color && ele.size === cartProduct.size
      );

      if (isProductExisting === undefined) {
        client.create(cartProduct).then((res) => {
          const updatedProduct = [...cartItem];
          updatedProduct.push(res);
          updatedProduct.sort(function (a: any, b: any) {
            return a._updatedAt < b._updatedAt ? 1 : -1;
          });
          localStorage.setItem("cart", JSON.stringify(updatedProduct));
          setCartQty(updatedProduct.length)
          return router.push("/cart");
        });
      } else {
        return router.push("/cart");
      }
    }
  }
  return (
    <div className="px-8 ">
      <div className="flex gap-8 justify-between items-start">
        <div
          style={{
            backgroundImage: `url(${product?.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundColor: "#f6f6f6",
            backgroundRepeat: "no-repeat",
          }}
          className="grow w-[40em] h-[450px]"
        ></div>
        <div className="grow basis-1/2">
          <p className="text-xs font-medium py-2">
            {product?.brand.toUpperCase()} COLLECTION{" "}
          </p>
          <p className=" pt-4 pb-1 text-3xl">{titleCase(product?.name)}</p>
          <p className="text-3xl font-bold ">{product?.price}</p>
          <p className="text-sm py-4">
            {" "}
            Product code : {product?._id.toUpperCase().slice(-9)}
          </p>
          <p>Rating :</p>
          <div className="pt-6">
            <h3 className="font-medium text-base">Description </h3>
            <p className="text-xl leading-10"> {product?.description}</p>
          </div>
          <div className="py-6">
            <h3 className="text-base pb-2">
              Available color: {selectedColor}{" "}
            </h3>
            <div className="flex gap-3">
              {product?.color.map((ele: string, index: number) => (
                <button
                  style={{ backgroundColor: ele }}
                  className=" border cursor-pointer border-dark w-8 h-8 contrast-75"
                  key={index}
                  onClick={() => setSelectedColor(ele)}
                >
                  {selectedColor === ele ? (
                    <CheckIcon className=" text-white" />
                  ) : (
                    ""
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-base pb-2"> Available size: {selectedSize} </h3>
            <div className="flex gap-3">
              {product?.size.map((ele: string, index: number) => (
                <button
                  className={`${
                    selectedSize === ele
                      ? "bg-dark text-white"
                      : "bg-white text-dark"
                  } text-xs text-center cursor-pointer flex justify-center items-center border border-dark w-fit p-3 h-8`}
                  key={index}
                  onClick={() => setSelectedSize(ele)}
                >
                  {ele}
                </button>
              ))}
            </div>
          </div>
          {error ? (
            <p className="py-2 text-md text-error">
              Select color and size to proceed
            </p>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            className="w-full p-3"
            onClick={() => addToCart(product)}
          >
            {" "}
            Add To Cart
          </Button>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="mt-36">
          <h2 className="text-center font-medium pb-8 text-xl ">
            You may also like
          </h2>
          <div className="flex gap-4">
            {similarProducts?.map((item: Product) => {
              return <Card item={item} key={item._id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;

export async function getStaticProps(context: { params: { id: any } }) {
  const productId = context.params?.id;
  const allProducts = await client.fetch(`*[]{
    ...,
  "imageUrl": image.asset->url
}`);
  const product = allProducts.find((item: Product) => productId === item._id);
  const similarProducts = allProducts.filter(
    (ele: Product) =>
      ele.category === product.category &&
      ele._id !== product._id &&
      ele._type === product._type
  );

  if (!product) {
    return {
      props: { hasError: true },
    };
  }
  return {
    props: {
      similarProducts,
      product,
    },
    revalidate: 60,
  };
}

export const getStaticPaths = async () => {
  const posts = await client.fetch(`*[_type == "footwear"]{
        name,
      _id
      }`);
  const pathsWithParams = posts.map((item: any) => ({
    params: { id: item.name },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
};

// sort out already in cart
