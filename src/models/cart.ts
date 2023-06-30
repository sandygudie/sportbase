import { Schema, model, models } from "mongoose";
import { productSchema } from "./product";

const cartSchema = new Schema(
  {
    product: {
      type: [productSchema],
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

cartSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
