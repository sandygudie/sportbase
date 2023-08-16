import { Product } from "@/types";

export const filterListHandler = (
  temp_collection: Product[],
  collectionSlug: string
) => {
  let keys: any = [];
  temp_collection.forEach((obj) => {
    for (const item in obj) {
      if (!keys.includes(item)) {
        keys.push(item);
      }
    }
  });
  let toRemove = [
    "_rev",
    "_type",
    "imageUrl",
    "_updatedAt",
    "_createdAt",
    "name",
    "_id",
    "image",
    "description",
  ];

  keys = keys.filter((el: any) => !toRemove.includes(el));
  let test: any = [];
  keys.forEach((ele: any) => {
    test.unshift({ name: ele });
  });
  test.map((item: any) => {
    item.name === "category"
      ? ((item.selection = temp_collection.map(({ category }) => category)),
        (item.id = 1))
      : item.name === "size"
      ? ((item.selection = temp_collection.map(({ size }) => size)),
        (item.id = 5))
      : item.name === "price"
      ? ((item.selection = temp_collection.map(({ price }) => price)),
        (item.id = 7))
      : item.name === "brand"
      ? ((item.selection = temp_collection.map(({ brand }) => brand)),
        (item.id = 3))
      : item.name === "gender"
      ? ((item.selection = temp_collection.map(({ gender }) => gender)),
        (item.id = 4))
      : item.name === "color"
      ? ((item.selection = temp_collection.map(({ color }) => color)),
        (item.id = 6))
      : item.name === "timeline"
      ? ((item.selection = temp_collection.map(({ timeline }) => timeline)),
        (item.id = 8))
      : ((item.selection = temp_collection.map(({ type }) => type)),
        (item.id = 2));
  });

  test.map((ele: any) => {
    ele.selection.map((el: any) => {
      if (Array.isArray(el)) {
        ele.selection = [].concat.apply([], ele.selection);
      }
      ele.selection = ele.selection.filter(
        (item: any, i: any, arr: any) =>
          arr.indexOf(item) == i && item !== undefined
      );
    });
  });
  test.sort((a: any, b: any) => a.id - b.id);

  let filterResult;
  if (
    collectionSlug == "women" ||
    collectionSlug == "men" ||
    collectionSlug == "kids" ||
    collectionSlug == "accessories"
  ) {
    filterResult = test.filter((ele: any) => ele.name !== "gender");
  } else {
    filterResult = [...test];
  }
  return filterResult;
};
