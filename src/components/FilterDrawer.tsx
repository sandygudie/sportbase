import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import FilterComponent from "./FilterComponent";
import { Product } from "@/types";
import TuneIcon from "@mui/icons-material/Tune";

type Props = {
  collection: Product[];
  collectionSlug: string;
};
export default function FilterDrawer({ collection, collectionSlug }: Props) {
  const [isOpen, setOpen] = useState(false);
  

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) =>
      setOpen(open);
      

  return (
    <div className="block md:hidden ">
      <div
        onClick={toggleDrawer(true)}
        role="button"
        className="flex text-sm items-center  gap-2 text-white"
      >
        <span className="font-normal">Filter </span>
        <TuneIcon className=" text-sm" />
      </div>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        <div className=" w-72 pt-8">
          <FilterComponent
            collection={collection}
            collectionSlug={collectionSlug}
            setOpen={ setOpen}
          />
        </div>
      </Drawer>
    </div>
  );
}
