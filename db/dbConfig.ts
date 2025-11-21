import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected");
      return;
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI missing");

    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};