import Link from "next/link";

export default function Card({ item }: any) {
  return (
    <Link className="hover:no-underline" href={`/product/${item._id}`}>
      <div className="relative overflow-hidden">
        {item.timeline === "latest" && (
          <p className="absolute font-medium text-xs md:text-base right-0 p-1 top-0 z-30 bg-primary/60 md:py-1.5 md:px-4">
            Latest{" "}
          </p>
        )}
        <div
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: "#f6f6f6",
            backgroundRepeat: "no-repeat",
          }}
          className="h-[5rem] sm:h-[15rem] md:w-full md:h-[400px] 2xl:h-[650px] transition-transform ease-in delay-100 hover:scale-110 duration-400"
        ></div>
      </div>
      <div>
        <p className="md:tracking-widest font-normal text-[0.5em] md:text-sm md:mt-2 overflow-hidden truncate md:w-[30ch]">
          {item.name.toUpperCase()}
        </p>
        <p className="md:mt-1 font-medium text-xs md:text-base">${item.price}</p>
      </div>
    </Link>
  );
}
