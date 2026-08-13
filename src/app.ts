import express from "express";
import indexRouter from "./routes/index";
import urlRouter from "./routes/url";

export const app = express();

app.use(express.json());

app.use("/", indexRouter);
app.use("/api/url", urlRouter);
