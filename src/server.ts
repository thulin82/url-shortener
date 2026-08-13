import { app } from "./app";
import { connectDb } from "./config/db";
import { config } from "./config";

connectDb();

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`),
);
