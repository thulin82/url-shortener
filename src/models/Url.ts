import mongoose, { Document, Schema } from "mongoose";

export interface IUrl extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  date: string;
}

const urlSchema = new Schema<IUrl>({
  urlCode: { type: String, required: true },
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString() },
});

export const Url = mongoose.model<IUrl>("Url", urlSchema);
