import Link from "next/link";

export default function Card({ item }: any) {
  return (
   
      <Link className="hover:no-underline" href={`/product/${item._id}`}>
        <div className="relative overflow-hidden">
          {item.timeline === "latest" && (
            <p className="absolute font-medium right-0 top-0 z-30 bg-primary/60 py-1.5 px-4">
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
            className="h-[200px] 2xl:h-[650px] md:h-[300px] transition-transform ease-in delay-100 hover:scale-110 duration-400"
          ></div>
        </div>
        <div>
          <p className="tracking-widest font-normal text-sm mt-2 overflow-hidden truncate md:w-[30ch]">
            {item.name.toUpperCase()}
          </p>
          <p className="mt-1 font-medium text-base">${item.price}</p>
        </div>
      </Link>

  );
}
