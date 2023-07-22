import { Product } from "@/types";

export const addFilterItem = (
  expanded: string | false,
  selectedItem: string,
  temp_collection: Product[]
) => {
  let filtered: Product[] = [];
  if (expanded === "brand" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({ brand }: any) => brand === selectedItem
    ));
  }
  if (expanded === "gender" && selectedItem) {
    return (filtered = temp_collection.filter(({ gender }: any) =>
      gender.includes(selectedItem)
    ));
  }
  if (expanded === "category" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({ category }: any) => category === selectedItem 
    ));
  }
  if (expanded === "type" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({ type }: any) => type === selectedItem
    ));
  }
  if (expanded === "color" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({ color }: any) => color.includes(selectedItem)
    ));
  }
  if (expanded === "timeline" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({ timeline }: any) => timeline === selectedItem
    ));
  }
  if (expanded === "size" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({size }: any) => size.includes(selectedItem)
    ));
  }
  if (expanded === "price" && selectedItem) {
    return (filtered = temp_collection.filter(
      ({ price }: any) => price === selectedItem
    ));
  } else {
    return filtered;
  }
};

export const removedFilterItem = (
  expanded: string | false,
  selectedItem: string,
  filteredCollection: Product[]
) => {
  let filtered;
  if (expanded === "brand" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ brand }: any) => brand !== selectedItem
    ));
  }
  if (expanded === "gender" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ gender }: any) => !gender.includes(selectedItem)
    ));
  }
  if (expanded === "category" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ category }: any) => category !== selectedItem
    ));
  }
  if (expanded === "type" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ type }: any) => type !== selectedItem
    ));
  }
  if (expanded === "color" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ color }: any) => !color.includes(selectedItem)
    ));
  }
  if (expanded === "size" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({size }: any) => !size.includes(selectedItem)
    ));
  }
  if (expanded === "timeline" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ timeline }: any) => timeline !== selectedItem
    ));
  }
  if (expanded === "price" && selectedItem) {
    return (filtered = filteredCollection.filter(
      ({ price }: any) => price !== selectedItem
    ));
  }
  // return filteredCollection;
};
