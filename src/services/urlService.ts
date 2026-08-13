import { nanoid } from "nanoid";
import { Url, IUrl } from "../models/Url";
import { config } from "../config";

export class InvalidUrlError extends Error {}

const isValidHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const findUrlByCode = async (code: string): Promise<IUrl | null> => {
  return Url.findOne({ urlCode: code });
};

export const createShortUrl = async (longUrl: string): Promise<IUrl> => {
  if (!isValidHttpUrl(config.baseUrl)) {
    throw new InvalidUrlError("Invalid base url");
  }

  if (!isValidHttpUrl(longUrl)) {
    throw new InvalidUrlError("Invalid long url");
  }

  const existing = await Url.findOne({ longUrl });
  if (existing) {
    return existing;
  }

  const urlCode = nanoid(8);
  const shortUrl = `${config.baseUrl}/${urlCode}`;

  return Url.create({
    longUrl,
    shortUrl,
    urlCode,
    date: new Date().toISOString(),
  });
};
