import { Router } from "express";
import { redirectToLongUrl } from "../controllers/urlController";

const router = Router();

router.get("/:code", redirectToLongUrl);

export default router;
