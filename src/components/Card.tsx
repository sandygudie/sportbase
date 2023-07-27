import Link from "next/link";
import Image from "next/image";

interface IProps {
  product: any;
  similarProducts?: boolean;
  latestProduct?: boolean;
}
export default function Card({
  product,
  similarProducts,
  latestProduct,
}: IProps) {
  return (
    <Link className="hover:no-underline" href={`/product/${product._id}`}>
      <div className="relative overflow-hidden">
        {product.timeline === "latest" && (
          <p className="absolute font-medium text-xs md:text-base left-0 p-1 top-0 z-30 bg-primary/60 md:py-1.5 md:px-4">
            Latest{" "}
          </p>
        )}
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          width={0}
          height={0}
          sizes="100vw"
          loading="lazy"
          className={`object-cover w-full ${
            similarProducts
              ? `h-[11rem] md:h-[300px]`
              : latestProduct
              ? "w-full h-36 sm:h-96 md:h-[18rem]"
              : "h-[5em] sm:h-[16rem] md:w-full lg:h-[30rem]"
          } 
           transition-transform ease-in delay-100 hover:scale-110 duration-400`}
        />
      </div>
      <div>
        <p className="md:tracking-widest font-normal text-[0.5em] md:text-sm md:mt-2 overflow-hidden truncate md:w-[30ch]">
          {product?.name.toUpperCase()}
        </p>
        <p className="md:mt-1 font-medium text-xs md:text-base">
          ${product?.price}
        </p>
      </div>
    </Link>
  );
}
