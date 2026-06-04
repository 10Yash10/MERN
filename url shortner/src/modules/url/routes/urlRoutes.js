import { Router } from "express";
import {
  createShortUrl,
  deactivateUrl,
  getAnalyticsSummary,
  getUrlDetails,
} from "../controller/UrlController.js";
import rateLimit from "express-rate-limit";
import { config } from "../../../config/env.js";

const router = Router();

const creationLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  message: {
    status: "error",
    errorCode: "RATE_LIMIT_EXCEED",
    message: "Too many link resources generated from this device",
  },
});

router.post("/urls", creationLimiter, createShortUrl);
router.get("/urls/:shortCode", getUrlDetails);
router.get("/urls/:shortCode/analytics", getAnalyticsSummary);
router.patch("/urls/:shortCode/deactivate", deactivateUrl);

export default router;
