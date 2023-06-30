import { Schema, model, models } from "mongoose";

export const productSchema = new Schema(
  {
    name: {
      type: String,
     required: true
      
    },
    productID: {
      type: String,
     required: true
    },
    color: {
      type: String,
     required: true
    },
    size: {
      type: String,
     required: true
    },
    category: {
      type: String,
     required: true
    },
    imageUrl: {
      type: String,
     required: true
    },
    price: {
      type: String,
      required: true
    },
    qty: {
      type: String,
      required: true
    },
    totalPrice: {
      type: String,
     required: true
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

productSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Product = models.Product || model("Product", productSchema);
export default Product;
