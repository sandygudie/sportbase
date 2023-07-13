import Card from "./Card";

export default function Collection({ collection }: any) {
  return (
    <div className="w-11/12 m-auto md:w-5/6 md:pl-12 md:ml-auto">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {collection.map((item: any) => {
          return (
            <div key={item._id} className="">
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
