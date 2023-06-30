import { CartRequest } from "@/types";
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

export const addProduct = async (payload: CartRequest, id: string|null) => {
  let response = await fetch(`/api/cart/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
};
export const getCartProducts = async (id: string) => {
  let response = await fetch(`/api/cart/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const randomID = "649d31612760f3fe7baa5a21";

