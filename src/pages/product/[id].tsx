import React, { useContext, useEffect, useState } from "react";
import { AppContextState, CartRequest, CartResponse, Product } from "@/types";
import { client } from "@/utilis";
import { addProduct } from "@/utilis/cart";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import { AppContext } from "@/context";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

import { Autoplay, Pagination } from "swiper";
import Spinner from "@/components/Spinner";
import Head from "next/head";

interface Props {
  product: Product;
  similarProducts: Product[];
}

function Index({ product, similarProducts }: Props) {
  const router = useRouter();
  const { setCartQtyhandler } = useContext(AppContext) as AppContextState;
  const [selectedColor, setSelectedColor] = useState<string>(" ");
  const [selectedSize, setSelectedSize] = useState<string>(" ");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedColor(" ");
    setSelectedSize(" ");
  }, [router.query.id]);

  async function addToCart(doc: Product) {
    if ((selectedColor || selectedColor) === " ") {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
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
      let temp_CartID: string | null;
      let cartID = localStorage.getItem("cartID");
      if (cartID !== null) {
        temp_CartID = cartID;
      } else {
        temp_CartID = "649d31612760f3fe7baa5a21";
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
      await addProduct(cartProduct, temp_CartID)
        .then((response) => response.json())
        .then((data) => {
          const { newProduct, cartId } = data.message;
          const updatedProduct = [...cartItem];
          updatedProduct.push(newProduct);
          updatedProduct.sort(function (a: any, b: any) {
            return a.updated_at < b.updated_at ? 1 : -1;
          });
          localStorage.setItem("cart", JSON.stringify(updatedProduct));
          setCartQtyhandler(updatedProduct.length);
          localStorage.setItem("cartID", cartId);

          return router.push("/cart");
        });
    }
  }
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <div className="py-8 md:py-16 px-4 md:px-8">
        <div className="block md:flex gap-8 justify-between items-start">
          <div className="basis-7/12">
            <Image
              src={product?.imageUrl}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              loading="lazy"
              className="object-cover w-full grow h-[450px]"
            />
          </div>

          <div className="pt-8 md:pt-0 grow md:px-8 basis-5/12">
            <p className="text-xs font-medium py-2">
              {product?.brand.toUpperCase()} COLLECTION{" "}
            </p>
            <p className="pb-1 font-bold text-xl md:text-3xl">
              {product?.name.toUpperCase()}
            </p>
            <p className="text-xl font-medium">${product?.price}</p>
            <p className="text-sm py-4">
              {" "}
              Product code : {product?._id.toUpperCase().slice(-9)}
            </p>
            {/* <p>Rating :</p> */}
            <div className="">
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
                    className="hover:scale-110 border-none cursor-pointer rounded-full border-dark w-8 h-8 contrast-75"
                    key={index}
                    onClick={() => {
                      setSelectedColor(ele), setError(false);
                    }}
                  >
                    {selectedColor === ele ? (
                      <CheckIcon
                        sx={{
                          fill:
                            ele == "white"
                              ? "black"
                              : ele == "black"
                              ? "white"
                              : "white",
                          width: "15px",
                          height: "30px",
                        }}
                      />
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
                Available size:
                <span className="font-bold"> {selectedSize} </span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product?.size.map((ele: string, index: number) => (
                  <button
                    className={`${
                      selectedSize === ele
                        ? "bg-dark text-white hover:bg-dark hover:text-primary"
                        : "bg-white text-dark"
                    } text-xs text-center cursor-pointer flex justify-center items-center border border-dark w-fit 
                  hover:bg-primary/10 p-3 h-8`}
                    key={index}
                    onClick={() => {
                      setSelectedSize(ele), setError(false);
                    }}
                  >
                    {ele}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative text-center mt-14">
              {error && (
                <p className="absolute -top-8 left-0 items-center flex gap-2 text-sm text-error">
                  <ErrorOutlineIcon
                    className="text-sm"
                    sx={{ fill: "red !important" }}
                  />{" "}
                  Select color and size to proceed
                </p>
              )}{" "}
              <Button
                variant="contained"
                className="w-full font-bold p-3"
                onClick={() => addToCart(product)}
              >
                {" "}
                {isLoading ? <Spinner /> : "Add To Cart"}
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
                <Swiper
                  slidesPerView={3}
                  slidesPerGroup={2}
                  spaceBetween={10}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
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
                  modules={[Autoplay, Pagination]}
                  className="mySwiper p-4 m-auto w-full"
                >
                  {similarProducts?.map((product: Product, i: number) => {
                    return (
                      <SwiperSlide className="md:w-72 my-12" key={product._id}>
                        <div>
                          <Card similarProducts={true} product={product} />
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
    </>
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
    params: { id: item._id },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
};
