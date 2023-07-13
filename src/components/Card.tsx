import Link from "next/link";

interface IProps {
  product: any;
  similarProducts?: boolean;
}
export default function Card({ product, similarProducts }: IProps) {
  return (
    <Link className="hover:no-underline" href={`/product/${product._id}`}>
      <div className="relative overflow-hidden">
        {product.timeline === "latest" && (
          <p className="absolute font-medium text-xs md:text-base right-0 p-1 top-0 z-30 bg-primary/60 md:py-1.5 md:px-4">
            Latest{" "}
          </p>
        )}
        <div
          style={{
            backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: "#f6f6f6",
            backgroundRepeat: "no-repeat",
          }}
          className={`${
            similarProducts ? `h-[11rem] md:h-[300px]` : `h-[5rem]`
          } sm:h-[15rem] md:w-full  2xl:h-[650px]
           transition-transform ease-in delay-100 hover:scale-110 duration-400`}
        ></div>
      </div>
      <div>
        <p className="md:tracking-widest font-normal text-[0.5em] md:text-sm md:mt-2 overflow-hidden truncate md:w-[30ch]">
          {product.name.toUpperCase()}
        </p>
        <p className="md:mt-1 font-medium text-xs md:text-base">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
