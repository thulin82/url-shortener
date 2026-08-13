import { describe, it, expect, vi, beforeEach } from "vitest";
import { Url } from "../../src/models/Url";
import {
  createShortUrl,
  findUrlByCode,
  InvalidUrlError,
} from "../../src/services/urlService";

vi.mock("../../src/models/Url", () => ({
  Url: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

describe("urlService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("findUrlByCode", () => {
    it("returns the url document matching the code", async () => {
      const doc = { urlCode: "abc123", longUrl: "https://example.com" };
      vi.mocked(Url.findOne).mockResolvedValue(doc as never);

      const result = await findUrlByCode("abc123");

      expect(Url.findOne).toHaveBeenCalledWith({ urlCode: "abc123" });
      expect(result).toEqual(doc);
    });

    it("returns null when no url matches", async () => {
      vi.mocked(Url.findOne).mockResolvedValue(null);

      const result = await findUrlByCode("missing");

      expect(result).toBeNull();
    });
  });

  describe("createShortUrl", () => {
    it("throws InvalidUrlError for an invalid long url", async () => {
      await expect(createShortUrl("not-a-url")).rejects.toBeInstanceOf(
        InvalidUrlError,
      );
    });

    it("returns the existing document when the long url already exists", async () => {
      const existing = {
        longUrl: "https://example.com",
        shortUrl: "http://short/abc",
      };
      vi.mocked(Url.findOne).mockResolvedValue(existing as never);

      const result = await createShortUrl("https://example.com");

      expect(result).toEqual(existing);
      expect(Url.create).not.toHaveBeenCalled();
    });

    it("creates a new short url when none exists yet", async () => {
      vi.mocked(Url.findOne).mockResolvedValue(null);
      const created = {
        longUrl: "https://example.com",
        shortUrl: "http://short/xyz",
      };
      vi.mocked(Url.create).mockResolvedValue(created as never);

      const result = await createShortUrl("https://example.com");

      expect(Url.create).toHaveBeenCalled();
      expect(result).toEqual(created);
    });
  });
});
