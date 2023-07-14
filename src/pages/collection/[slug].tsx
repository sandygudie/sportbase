/* eslint-disable react-hooks/exhaustive-deps */
import FilterComponent from "@/components/FilterComponent";
import Products from "@/components/Collection";
import { Product } from "@/types";
import { client, titleCase } from "@/utilis";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

import FilterDrawer from "@/components/FilterDrawer";

type Props = {
  collectionData: Product[];
  collectionSlug: string;
  setShowSubNav: Dispatch<SetStateAction<boolean>>;
};

function Index({ collectionData, collectionSlug, setShowSubNav }: Props) {
  const router = useRouter();
  
  const [collection, setCollection] = useState(collectionData);
  let category = router.query["category"];
  useEffect(() => {
    setShowSubNav(false);
    filterCollection();
  }, []);

  const filterCollection = () => {
    if (category?.length) {
      let categoryItems = collectionData.filter((ele: Product) =>
        ele.category === category ? ele : ele.type === category
      );
      setCollection(categoryItems);
    }
  };
  return (
    <main>
      {collection?.length ? (
        <>
          {" "}
          <div className="px-2 py-4 md:p-6 bg-dark sticky top-20 md:top-24 z-40  flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-white font-medium text-sm md:text-xl">
                {collectionSlug && `${titleCase(collectionSlug)} Collections`}
              </h1>
              <p className="flex items-center justify-center rounded-full w-5 font-bold h-5  bg-gray-100">
                {collection?.length}
              </p>
            </div>
            <FilterDrawer
              collection={collection}
              collectionSlug={collectionSlug}
            />
          </div>
          <div className="md:mx-8 flex items-start relative">
            <div className="hidden md:block sticky top-56 w-1/6 font-bold text-xl">
              <FilterComponent
                collection={collection}
                collectionSlug={collectionSlug}
              />
            </div>
            <Products collection={collection} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col h-80">
          <Spinner />
        </div>
      )}
    </main>
  );
}

export default Index;

export async function getStaticProps(context: { params: { slug: any } }) {
  const collectionSlug = context.params?.slug;
  const res = await client.fetch(`*[]{
    ...,
  "imageUrl": image.asset->url
}`);
  const collectionData = res.filter((ele: Product) =>
    ele._type === collectionSlug
      ? ele
      : ele.brand === collectionSlug
      ? ele.brand === collectionSlug
      : ele?.gender?.includes(collectionSlug)
      ? ele?.gender?.includes(collectionSlug)
      : ele.timeline === collectionSlug
  );
  collectionData.sort(function (a: any, b: any) {
    if (a._type === b._type) return 0;
    return a._type < b._type ? 1 : -1;
  });
  return {
    props: {
      collectionData,
      collectionSlug,
    },
    revalidate: 60,
  };
}

export const getStaticPaths = async () => {
  const collections = await client.fetch(`*[_type == "footwear"]{
        name,
      _id
      }`);
  const pathsWithParams = collections.map((item: any) => ({
    params: { slug: item.name },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
};
