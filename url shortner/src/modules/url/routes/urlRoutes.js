import { Router } from "express";
import { createShortUrl } from "../controller/UrlController.js";

const router = Router();

router.post("/urls", createShortUrl);

export default router;
