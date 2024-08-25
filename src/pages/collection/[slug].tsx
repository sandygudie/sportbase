/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import FilterComponent from "@/components/FilterComponent";
import Collection from "@/components/Collection";
import { AppContextState, Product } from "@/types";
import { client, titleCase } from "@/utilis";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import TuneIcon from "@mui/icons-material/Tune";
import FilterDrawer from "@/components/FilterDrawer";
import { AppContext } from "@/context";
import GridViewIcon from "@mui/icons-material/GridView";
import AppsIcon from "@mui/icons-material/Apps";
import { IconButton } from "@mui/material";
import CustomHead from "@/components/CustomHead";

type Props = {
  collectionData: Product[];
  collectionSlug: string;
};

function Index({ collectionData, collectionSlug }: Props) {
  const { showSubNavHandler } = useContext(AppContext) as AppContextState;
  const router = useRouter();
  const [collection, setCollection] = useState<Product[]>();
  const [filteredCollection, setFilteredCollection] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [toggleColumn, setToggleColumn] = useState(false);

  useEffect(() => {
    let category: string | any = router.query["category"];
    showSubNavHandler(false);
    getCollectionData(category);
  }, [router.query, filteredCollection]);

  const getCollectionData = (category: string) => {
    setLoading(true);
    if (category?.length) {
      let categoryItems = collectionData.filter((ele: Product) =>
        ele.category === category ? ele : ele.type === category
      );
      setCollection(categoryItems);
      setCategory(category);
    } else {
      setCollection(collectionData);
    }
    setLoading(false);
  };

  const updateFilterCollection = (updatedFilter: Product[]) => {
    setFilteredCollection(updatedFilter);
  };

  return (
    <>
      <CustomHead
        title="Collections"
        content={`Get ${collectionSlug} collections on Sportbase`}
      />
      <main>
        {isLoading || collection === undefined ? (
          <div className="flex items-center justify-center flex-col h-80">
            <Spinner />
          </div>
        ) : collection?.length ? (
          <>
            {" "}
            <div className="px-2 py-4 md:p-6 sticky top-16 z-40 bg-dark flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-white font-medium text-sm md:text-xl">
                  {category
                    ? `${titleCase(category)}`
                    : `${titleCase(collectionSlug)}`}{" "}
                  Collections
                </h1>
                <p className="flex items-center text-xs justify-center p-1 rounded-full w-5 font-bold h-5  bg-gray-100">
                  {collection?.length}
                </p>
              </div>
              <div className="flex gap-6 items-center">
                <div>
                  {toggleColumn ? (
                    <IconButton onClick={() => setToggleColumn(false)}>
                      <GridViewIcon className="text-white" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setToggleColumn(true)}>
                      <AppsIcon className="text-white" />
                    </IconButton>
                  )}
                </div>
                <FilterDrawer>
                  <FilterComponent
                    collectionSlug={collectionSlug}
                    collection={collection}
                    updateFilterCollection={updateFilterCollection}
                  />
                </FilterDrawer>
              </div>
            </div>
            <div className="md:mx-8 my-8 md:my-12 flex relative items-start">
              <div
                className={`filterlist hidden md:block sticky h-screen overflow-auto w-[250px] top-44`}
              >
                <p className="mb-6 flex items-center justify-between">
                  <span className="text-base font-bold">FILTER </span>

                  <TuneIcon />
                </p>
                <FilterComponent
                  collectionSlug={collectionSlug}
                  collection={collection}
                  updateFilterCollection={updateFilterCollection}
                />
              </div>
              <Collection
                toggleColumn={toggleColumn}
                collection={
                  filteredCollection.length ? filteredCollection : collection
                }
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-80">
            No Product Found
          </div>
        )}
      </main>
    </>
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
