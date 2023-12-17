

export const createCartReceiptRequest= async (
  cartId: string | null
) => {
  let response = await fetch(`/api/receipt/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  return response;
};
export const getAllReceipts = async (cartId: string) => {
  let response = await fetch(`/api/receipt/${cartId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

