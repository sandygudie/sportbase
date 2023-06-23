import Link from "next/link";

export default function Card({ item }: any) {
  return (
    <Link  href={`/product/${item._id}`}>
      <div className="relative overflow-hidden">
        {item.timeline === "newest" && (
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
          className="2xl:h-[650px] h-[300px] transition-transform ease-in delay-150 hover:scale-110 duration-1000"
        ></div>
      </div>
      <div>
        <p className="font-bold mt-2 overflow-hidden truncate w-[30ch]">
          {item.name}
        </p>
        <p className="mt-1">${item.price}</p>
      </div>
    </Link>
  );
}
