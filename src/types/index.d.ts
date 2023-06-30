export interface Product {
  name: string;
  brand: string;
  category: string;
  color: string[];
  description: string;
  gender: string[];
  imageUrl: string;
  type: string;
  size: string[];
  price: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  timeline: string;
  _type: string;
}
export interface CartRequest {
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  size: string;
  price: number;
  productID: string;
  qty:number,
  totalPrice:number
}
export interface CartResponse {
  name: string;
  brand: string;
  category: string;
  color: string;
  image: string;
  imageUrl: string;
  size: string;
  price: number;
  _createdAt: string;
  _id: string;
  productID: string;
  _rev: string;
  _type: string;
  qty:number,
  totalPrice:number

  
}

export interface AppContextState {
products: Product[];
cartQty: number,
setCartQty: Dispatch<SetStateAction<number>>

}