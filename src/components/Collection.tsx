import { Product } from "@/types";
import Card from "./Card";
import { useState } from "react";
import Button from "@mui/material/Button";

type Props = {
  collection: Product[];
  toggleColumn: boolean;
};

export default function Collection({ collection, toggleColumn }: Props) {
  const quantity: number = 16;
  const [displayQty, setDisplayQty] = useState(quantity);

  const loadMore = () => {
    setDisplayQty(displayQty + quantity);
  };

  return (
    <div className="w-11/12 mx-auto md:w-5/6 md:pl-12 md:ml-auto">
      <div
        className={`${
          toggleColumn ? "grid-cols-2" : "grid-cols-3"
        } grid  gap-x-6 gap-y-8`}
      >
        {collection.map((product: Product, i: number) => {
          return (
            i < displayQty && (
              <div key={product._id} className="">
                <Card product={product} />
              </div>
            )
          );
        })}
      </div>
      {displayQty < collection.length ? (
        <div className="text-center mt-16">
          <Button
            variant="contained"
            className="px-6 font-bold "
            onClick={() => loadMore()}
          >
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  );
}
