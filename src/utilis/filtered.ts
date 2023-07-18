import { Product } from "@/types";

export const addFilterItem = (
  expanded: string | false,
  selected: string,
  temp_collection: Product[]
) => {
  let filtered: Product[] = [];
  if (expanded === "brand" && selected) {
    return (filtered = temp_collection.filter(
      ({ brand }: any) => brand === selected
    ));
  }
  if (expanded === "gender" && selected) {
    return (filtered = temp_collection.filter(({ gender }: any) =>
      gender.includes(selected)
    ));
  }
  if (expanded === "category" && selected) {
    return (filtered = temp_collection.filter(
      ({ category }: any) => category === selected
    ));
  }
  if (expanded === "type" && selected) {
    return (filtered = temp_collection.filter(
      ({ type }: any) => type === selected
    ));
  }
  if (expanded === "color" && selected) {
    return (filtered = temp_collection.filter(
      ({ color }: any) => color === selected
    ));
  }
  if (expanded === "timeline" && selected) {
    return (filtered = temp_collection.filter(
      ({ timeline }: any) => timeline === selected
    ));
  }
  if (expanded === "size" && selected) {
    return (filtered = temp_collection.filter(
      ({size }: any) => size.includes(selected)
    ));
  }
  if (expanded === "price" && selected) {
    return (filtered = temp_collection.filter(
      ({ price }: any) => price === selected
    ));
  } else {
    return filtered;
  }
};

export const removedFilterItem = (
  expanded: string | false,
  selected: string,
  filteredCollection: Product[]
) => {
  let filtered;
  if (expanded === "brand" && selected) {
    return (filtered = filteredCollection.filter(
      ({ brand }: any) => brand !== selected
    ));
  }
  if (expanded === "gender" && selected) {
    return (filtered = filteredCollection.filter(
      ({ gender }: any) => !gender.includes(selected)
    ));
  }
  if (expanded === "category" && selected) {
    return (filtered = filteredCollection.filter(
      ({ category }: any) => category !== selected
    ));
  }
  if (expanded === "type" && selected) {
    return (filtered = filteredCollection.filter(
      ({ type }: any) => type !== selected
    ));
  }
  if (expanded === "color" && selected) {
    return (filtered = filteredCollection.filter(
      ({ color }: any) => !color.includes(selected)
    ));
  }
  if (expanded === "size" && selected) {
    return (filtered = filteredCollection.filter(
      ({size }: any) => !size.includes(selected)
    ));
  }
  if (expanded === "timeline" && selected) {
    return (filtered = filteredCollection.filter(
      ({ timeline }: any) => timeline !== selected
    ));
  }
  if (expanded === "price" && selected) {
    return (filtered = filteredCollection.filter(
      ({ price }: any) => price !== selected
    ));
  }
  return filteredCollection;
};
