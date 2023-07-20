import { CartRequest } from "@/types";

export const addProduct = async (payload: CartRequest, id: string | null) => {
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
  
  export const deleteCartProduct = async (cartID: string | null, id: string) => {
    let response = await fetch(`/api/cart/${cartID}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };
  
  export const updateCartProduct = async (
    cartID: string | null,
    id: string,
    payload: any
  ) => {
    let response = await fetch(`/api/cart/${cartID}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response;
  };