import { Schema, model, models } from "mongoose";
import { productSchema } from "./product";

const receiptSchema = new Schema(
    {
        product: {
            type: [productSchema],
        },
        cartID: String,
    },

    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

receiptSchema.set("toJSON", {
    transform: (returnedObject: any) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const Receipt = models.Receipt || model("Receipt", receiptSchema);
export default Receipt;
