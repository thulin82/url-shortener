import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import { Url } from "../../src/models/Url";

vi.mock("../../src/models/Url", () => ({
  Url: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

// import after mocking so the app picks up the mocked model
const { app } = await import("../../src/app");

describe("GET /:code", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("redirects to the long url when the code exists", async () => {
    vi.mocked(Url.findOne).mockResolvedValue({
      longUrl: "https://example.com",
    } as never);

    const response = await request(app).get("/abc123");

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("https://example.com");
  });

  it("returns 404 when the code does not exist", async () => {
    vi.mocked(Url.findOne).mockResolvedValue(null);

    const response = await request(app).get("/missing");

    expect(response.status).toBe(404);
  });
});

describe("POST /api/url/shorten", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates a short url for a valid long url", async () => {
    vi.mocked(Url.findOne).mockResolvedValue(null);
    vi.mocked(Url.create).mockResolvedValue({
      longUrl: "https://example.com",
      shortUrl: "http://localhost:5000/abc123",
      urlCode: "abc123",
    } as never);

    const response = await request(app)
      .post("/api/url/shorten")
      .send({ longUrl: "https://example.com" });

    expect(response.status).toBe(200);
    expect(response.body.longUrl).toBe("https://example.com");
  });

  it("returns 401 for an invalid long url", async () => {
    const response = await request(app)
      .post("/api/url/shorten")
      .send({ longUrl: "not-a-url" });

    expect(response.status).toBe(401);
  });
});
