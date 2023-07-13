import mongoose from "mongoose";
import logger from "../logger";

mongoose.Promise = global.Promise;
const db = {
  mongoose,
};

const connectToDB = async () => {
  await db.mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URL)
    .then(() => {
      logger.info("Database connected successfully");
    })
    .catch((err) => {
      logger.error(err);
    });
};

const disconnectDB = async () => {
  await db.mongoose.disconnect();
};

export { connectToDB, disconnectDB };
