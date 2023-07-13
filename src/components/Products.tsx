import Card from "./Card";

export default function Products({ collection }: any) {
  // console.log(products)
  return (
    <div className="md:w-5/6 md:pl-8 ml-auto">
      <div className="w-11/12 m-auto flex items-center justify-start flex-wrap gap-12">
        {collection.map((item: any) => {
          return (
            <div key={item._id} className="grow w-48 md:w-56 2xl:w-[30em]">
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
