import FilterComponent from "@/components/FilterComponent";
import Products from "@/components/Products";
import { Product } from "@/types";
import { client, titleCase } from "@/utilis";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  productData: Product[];
  productSlug: string;
  setShowSubNav: Dispatch<SetStateAction<boolean>>;
};

function Index({ productData, productSlug, setShowSubNav }: Props) {
  const [products, setProductData] = useState(productData);
  const router = useRouter();
  var category = router.query["category"];

  useEffect(() => {
    setShowSubNav(false);
    if (category?.length) {
      let categoryData = products.filter((ele: Product) =>
        ele.category === category ? ele : ele.type === category
      );
      setProductData(categoryData);
      console.log(categoryData);
    }
  }, [category, setShowSubNav]);

  return (
    <>
      {/* <div
        style={{
          backgroundImage: `url(${
            products[Math.floor(Math.random() * products.length)]?.imageUrl
          })`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f6f6f6",
        }}
        className=" w-full h-[600px]"
      ></div> */}
      <div className="p-8 w-full bg-dark sticky top-10 z-40">
        <h1 className="text-white font-medium text-xl">
          {productSlug && `${titleCase(productSlug)} Collections`}{" "}
        </h1>
      </div>
      <div className="my-12  mx-8 flex items-start relative ">
        <FilterComponent />
        <Products products={products} />
      </div>
    </>
  );
}

export default Index;

export async function getStaticProps(context: { params: { slug: any } }) {
  const productSlug = context.params?.slug;
  const productResponse = await client.fetch(`*[]{
    ...,
  "imageUrl": image.asset->url
}`);
  const productData = productResponse.filter((ele: Product) =>
    ele._type === productSlug
      ? ele
      : ele.brand === productSlug
      ? ele.brand === productSlug
      : ele?.gender?.includes(productSlug)
      ? ele?.gender?.includes(productSlug)
      : ele.category === productSlug
      ? ele.category === productSlug
      : ele.timeline === productSlug
  );
  productData.sort(function (a: any, b: any) {
    if (a._type === b._type) return 0;
    return a._type < b._type ? 1 : -1;
  });
  return {
    props: {
      productData,
      productSlug,
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
    params: { slug: item.name },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
};
