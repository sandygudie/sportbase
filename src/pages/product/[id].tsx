import { AppContextState, CartRequest, CartResponse, Product } from "@/types";
import { addProduct, client } from "@/utilis";
import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import { AppContext } from "@/context";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper";

type Props = {
  product: Product;
  similarProducts: Product[];
};

function Index({ product, similarProducts }: Props) {
  const { setCartQty } = useContext(AppContext) as AppContextState;
  const [selectedColor, setSelectedColor] = useState<string>(" ");
  const [selectedSize, setSelectedSize] = useState<string>(" ");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedColor(" ");
    setSelectedSize(" ");
  }, [router.query.id]);

  async function addToCart(doc: Product) {
    if ((selectedColor || selectedColor) === " ") {
      setError(true);
    } else {
      setError(false);
      const cartProduct: CartRequest = {
        name: doc.name,
        color: selectedColor,
        size: selectedSize,
        category: product._type,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        productID: product._id,
        qty: 1,
        totalPrice: Number(product.price),
      };

      let cartItem = JSON.parse(localStorage.getItem("cart") || "[]");
      let cartID: string | null;
      let cartIdStorage = localStorage.getItem("cartID");
      if (cartIdStorage !== null) {
        cartID = cartIdStorage;
      } else {
        cartID = "649d31612760f3fe7baa5a21";
      }

      if (cartItem) {
        let isProductExisting = cartItem.find(
          (ele: CartResponse) =>
            ele.color === cartProduct.color && ele.size === cartProduct.size
        );
        if (isProductExisting) {
          return router.push("/cart");
        }
      }
      await addProduct(cartProduct, cartID)
        .then((response) => response.json())
        .then((data) => {
          const { newProduct, cartId } = data.message;
          const updatedProduct = [...cartItem];
          updatedProduct.push(newProduct);
          updatedProduct.sort(function (a: any, b: any) {
            return a.updated_at < b.updated_at ? 1 : -1;
          });
          localStorage.setItem("cart", JSON.stringify(updatedProduct));
          setCartQty(updatedProduct.length); // to update the navbar from context, think of another option
          if (cartIdStorage === null) {
            localStorage.setItem("cartID", cartId);
          }
          return router.push("/cart");
        });
    }
  }
  return (
    <div className="py-8 md:py-16 px-4 md:px-8">
      <div className="block md:flex gap-8 justify-between items-start">
        <div
          style={{
            backgroundImage: `url(${product?.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundColor: "#f6f6f6",
            backgroundRepeat: "no-repeat",
          }}
          className="grow basis-1/3 h-[450px]"
        ></div>
        <div className="pt-8 md:pt-0 grow md:px-8 basis-1/3">
          <p className="text-xs font-medium py-2">
            {product?.brand.toUpperCase()} COLLECTION{" "}
          </p>
          <p className=" pt-4 pb-1 font-bold text-xl md:text-3xl">
            {product?.name.toUpperCase()}
          </p>
          <p className="text-3xl font-medium">${product?.price}</p>
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
            <h3 className="text-base font-medium pb-2">
              Available color:
              <span className="font-bold"> {selectedColor} </span>
            </h3>
            <div className="flex gap-3">
              {product?.color.map((ele: string, index: number) => (
                <button
                  style={{ backgroundColor: ele }}
                  className=" border-none cursor-pointer border-dark w-8 h-8 contrast-75"
                  key={index}
                  onClick={() => setSelectedColor(ele)}
                >
                  {selectedColor === ele ? (
                    <CheckIcon sx={{ fill: "white" }} />
                  ) : (
                    ""
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-base font-medium pb-2">
              {" "}
              Available size:<span className="font-bold"> {selectedSize} </span>
            </h3>
            <div className="flex flex-wrap gap-3">
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
            <p className="py-2 flex gap-2 text-md text-error">
              <ErrorOutlineIcon sx={{ fill: "red !important" }} /> Select color
              and size to proceed
            </p>
          ) : (
            ""
          )}
          <div className="text-center">
            {" "}
            <Button
              variant="contained"
              className="w-full md:w-5/6 p-3"
              onClick={() => addToCart(product)}
            >
              {" "}
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="mt-36">
          <h2 className="text-center font-medium pb-8 text-xl ">
            You may also like
          </h2>

          <div className="overflow-hidden my-5">
            <div className=" m-auto flex overflow-x-auto items-center md:justify-center gap-12">
              {/* <Swiper
                spaceBetween={60}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {similarProducts?.map((item: Product, i: number) => {
                  return (
                    <SwiperSlide className=" bg-gray-100 p-8" key={item._id}>
                      <div className="w-72 2xl:w-[30em]">
                        <Card item={item} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper> */}
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  200: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  500: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  751: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },

                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper p-4 m-auto w-full"
              >
                {similarProducts?.map((item: Product, i: number) => {
                  return (
                    <SwiperSlide className="md:w-72" key={item._id}>
                      <div>
                        <Card item={item} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
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
