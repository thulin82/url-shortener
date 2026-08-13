import { Request, Response } from "express";
import {
  createShortUrl,
  findUrlByCode,
  InvalidUrlError,
} from "../services/urlService";

export const redirectToLongUrl = async (
  req: Request<{ code: string }>,
  res: Response,
): Promise<void> => {
  try {
    const url = await findUrlByCode(req.params.code);

    if (url) {
      res.redirect(url.longUrl);
      return;
    }

    res.status(404).json({ message: "No url found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const shortenUrl = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { longUrl } = req.body;

  try {
    const url = await createShortUrl(longUrl);
    res.json(url);
  } catch (error) {
    if (error instanceof InvalidUrlError) {
      res.status(401).json({ message: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
