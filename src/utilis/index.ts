import { Product } from "@/types";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_PROJECT_TOKEN,
  ignoreBrowserTokenWarning: true,
});

export const titleCase = (ele: string | undefined) => {
  const words = ele?.split(" ");
  return words
    ?.map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    ?.join(" ");
};

