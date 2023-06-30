import mongoose from "mongoose";
import User from "@/models/user";
import logger from "../logger";
import { DB_URL } from "../env";

mongoose.Promise = global.Promise;
const db = {
  mongoose,
  user: User,
};

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectToDB = async () => {
  await db.mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URL, options)
    .then(() => {
      console.log("Database connected successfully")
      logger.info("Database connected successfully");
    })
    .catch((err) => {
      logger.error(err);
    });
};

const disconnectDB = async () => {
  await db.mongoose.disconnect();
};

// create default admin account
function createDefaultAdmin() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        name: "Admin-user",
        email: "dev@gmail.com",
        password: "admin",
        role: "superadmin",
      }).save((error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.log("Error creating default admin", error);
        }
        // eslint-disable-next-line no-console
        console.log("Admin created");
      });
    }
  });
}

export { connectToDB, disconnectDB, createDefaultAdmin };
