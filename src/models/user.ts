import { Schema, model, models } from "mongoose";


const userSchema = new Schema(
  {
   
    email: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);


userSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = models.User || model("User", userSchema);
export default User;
