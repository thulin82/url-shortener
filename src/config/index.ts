import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener",
  baseUrl: process.env.APP_BASE_URL || "http://localhost:5000",
};
