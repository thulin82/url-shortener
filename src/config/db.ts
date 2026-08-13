import mongoose from "mongoose";
import { config } from "./index";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
