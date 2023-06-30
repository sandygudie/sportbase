import { Schema, model, models } from "mongoose";
// import handleCastError from '../plugins/handleCastError';
// import { hashPassword, validate } from '../plugins/auth';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  { timestamps: true }
);

// /**
//  * Pre-save hook for hashing passwords the first time a user creates an account.
//  * @param next mongoose hook next function
//  */
// userSchema.pre('save', async function updatePassword(next) {
//   const hash = await hashPassword(this);
//   this.password = hash;
//   next();
// });

// /**
//  * Mongoose document instance method used to check if a plain text
//  * matches the password field of a user's document
//  * @param plainText plain text password to be validated
//  */
// userSchema.methods.validatePassword = async function validatePassword(plainText) {
//   await validate(this, plainText);
// };

// /**
//  * Mongoose document instance method used for hashing a user's updated password.
//  * @param plainText plain text password to be encrypted.
//  */
// userSchema.methods.updatePassword = async function updatePassword(plainText) {
//   const hash = await hashPassword(this, plainText);
//   this.password = hash;
//   return hash;
// };
userSchema.set("toJSON", {
  transform: (returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = models.User || model("User", userSchema);
export default User;
