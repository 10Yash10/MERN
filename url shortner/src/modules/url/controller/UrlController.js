import { UrlService } from "../service/UrlService.js";
import { createUrlSchema } from "../validation/urlValidation.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { config } from "../../../config/env.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const parsedBody = createUrlSchema.parse(req.body);
  const ip = req.ip || req.headers["x-forwarded-for"];

  const result = await UrlService.shortenUrl(parsedBody, ip);

  return res.status(201).json({
    status: "success",
    data: {
      shortCode: result.shortCode,
      shortUrl: `${config.APP_BASE_URL}/${result.shortCode}`,
      originalUrl: result.originalUrl,
      expiresAt: result.expiresAt,
    },
  });
});

export const handleRedirect = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  const requestDetails = {
    ip: req.ip || req.headers["x-forwarded-for"],
    userAgent: req.headers["user-agent"],
    referrer: req.headers["referer"],
  };

  const destinationUrl = await UrlService.resolveAndProcessRedirect(
    shortCode,
    requestDetails,
  );

  return res.redirect(302, destinationUrl);
});

export const getUrlDetails = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const metadata = await UrlService.getUrlMetadata(shortCode);

  return res.status(200).json({ status: "success", data: metadata });
});

export const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const metrics = await UrlService.getAggregatedMetrics(req.params.shortCode);

  return res.status(200).json({ status: "success", data: metrics });
});

export const deactivateUrl = asyncHandler(async (req, res) => {
  const confirmation = await UrlService.deactivateUrlService(
    req.params.shortCode,
  );

  return res.status(200).json({ status: "success", data: confirmation });
});
