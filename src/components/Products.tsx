import Card from "./Card";

export default function Products({  products }: any) {
  // console.log(products)
  return (
    <div className="w-5/6 pl-8 ml-auto">
      <div className="flex items-center justify-start flex-wrap gap-12">
        {products.map((item: any) => {
          return <Card  item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}
