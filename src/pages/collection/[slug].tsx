import FilterComponent from "@/components/FilterComponent";
import Products from "@/components/Products";
import { Product } from "@/types";
import { client, titleCase } from "@/utilis";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

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
      let categoryData = productData.filter((ele: Product) =>
        ele.category === category ? ele : ele.type === category
      );
      setProductData(categoryData);
    }
    // if (products.length === 0) {
    //   router.reload();
    // }
  }, [category, setShowSubNav]);

  return (
    <main>
      {products?.length ? (
        <>
          {" "}
          <div className="p-8 bg-dark sticky top-16 z-40 flex items-center gap-4">
            <h1 className="text-white font-medium text-xl">
              {productSlug && `${titleCase(productSlug)} Collections`}
            </h1>
            <p className="flex items-center justify-center rounded-full w-5 font-bold h-5 p-2 bg-gray-100">
              {products?.length}
            </p>
          </div>
          <div className="my-12 md:mx-8 flex items-start relative ">
            <FilterComponent products={products} productSlug={productSlug} />
            <Products products={products} />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </main>
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
