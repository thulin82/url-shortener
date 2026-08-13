import { vi } from "vitest";

vi.mock("../src/config/db", () => ({
  connectDb: vi.fn(),
}));
