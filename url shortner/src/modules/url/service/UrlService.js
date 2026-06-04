import { Url } from "../model/Url.js";
import { AnalyticsEvent } from "../model/AnalyticsEvent.js";
import { hashString } from "../../../shared/utils/crypto.js";
import { generateShortCode, normalizeUrl } from "../utils/urlHelper.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { UAParser } from "ua-parser-js";

export class UrlService {
  static async shortenUrl(payload, clientIp) {
    const { url, customAlias, expiresInHours } = payload;
    const normalize = normalizeUrl(url);
    const ipHash = hashString(clientIp);

    let finalShortCode;
    const isCustom = !!customAlias;

    if (isCustom) {
      // check for alias conflict immediately.
      const existing = await Url.findOne({ customAlias });

      if (existing) {
        throw new AppError(
          "The requested custom alias is already taken",
          409,
          "ALIAS_CONFLICT",
        );
      }

      finalShortCode = customAlias;
    } else {
      // generate url and then check in database 3 times. if not able to generate throw error
      let attempt = 0;

      while (attempt < 3) {
        const candidate = generateShortCode();
        const collisionCheck = await Url.findOne({ shortCode: candidate });

        if (!collisionCheck) {
          finalShortCode = candidate;
          break;
        }

        attempt++;
      }

      if (!finalShortCode) {
        throw new AppError(
          "Server was unable to generate a unique link identifier. Please try again.', 500, 'COLLISION_FAILURE",
        );
      }
    }

    const expiresAt = expiresInHours
      ? new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
      : null;

    const newUrlRecord = await Url.create({
      shortCode: finalShortCode,
      originalUrl: url,
      normalizedUrl: normalize,
      customAlias: isCustom ? customAlias : null,
      isCustomAlias: isCustom,
      expiresAt,
      createdByIpHash: ipHash,
    });

    return newUrlRecord;
    // END OF SHORTENURL FUNCTION
  }

  static async resolveAndProcessRedirect(shortCode, requestDetails) {
    const { ip, userAgent, referrer } = requestDetails;
    const urlRecord = await Url.findOne({ shortCode });

    // check if there is any record found or if that record is active
    if (!urlRecord || !urlRecord.isActive) {
      throw new AppError(
        "The requested short URL does not exist or has been disabled",
        404,
        "URL_NOT_FOUND",
      );
    }

    if (urlRecord.expiresAt && urlRecord.expiresAt < new Date()) {
      throw new AppError(
        "The url you are trying to use has expired",
        410,
        "URL_EXPIRED",
      );
    }

    // while redirecting we do analytics related operation
    // FIRE AND FORGET analytics tracking
    this.trackAnalyticsAsync(shortCode, ip, userAgent, referrer).catch((err) =>
      console.error(
        "[NON-BLOCKING ERROR] Logging analytic trace failed for ",
        shortCode,
        err,
      ),
    );

    return urlRecord.originalUrl;
  }

  static async trackAnalyticsAsync(shortCode, ip, uaString, referrerString) {
    const ipHash = hashString(ip);
    const visitorsHash = hashString(`${ip}-${uaString}`);
    const parser = new UAParser(uaString);
    const uaParsed = parser.getResult();

    // Challenge 6 Implementation: Detect Bot Traffic Pollution
    const botPattern = /bot|spider|crawl|slurp|api|lighthouse|scrap/i;
    const isBot = botPattern.test(uaString || "");

    // automatic increase by 1
    await Url.updateOne({ shortCode }, { $inc: { totalClicks: 1 } });

    // create new analyticsEvent
    await AnalyticsEvent.create({
      shortCode,
      visitorsHash,
      ipHash,
      userAgent: uaString,
      referrer: referrerString || "Direct",
      deviceType: uaParsed.device.type || "desktop",
      browser: uaParsed.browser.name || "unknown",
      isBot,
    });
  }

  static async getUrlMetadata(shortCode) {
    const record = await Url.findOne({ shortCode }).select(
      "-createdByIpHash -__v",
    );

    if (!record) throw new AppError("URL not found", 404, "URL_NOT_FOUND");

    return record;
  }

  static async getAggregatedMetrics(shortCode) {
    const record = await Url.findOne({ shortCode });

    if (!record)
      throw new AppError(
        "URL metrics tracking profile not found",
        404,
        "URL_NOT_FOUND",
      );

    const aggregatePipeline = await AnalyticsEvent.aggregate([
      { $match: { shortCode } },
      {
        $facet: {
          uniqueVisitorsCount: [
            { $group: { _id: "$visitorsHash" } },
            { $count: "count" },
          ],
          topBrowsers: [
            { $group: { _id: "$browser", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
          ],
          topReferrer: [
            { $group: { _id: "$referrer", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
          ],
        },
      },
    ]);

    const facetResult = aggregatePipeline[0];
    const uniqueCount = facetResult.uniqueVisitorsCount[0]?.count || 0;

    return {
      totalClicks: record.totalClicks,
      uniqueVisitors: uniqueCount,
      topBrowsers: facetResult.topBrowsers,
      topReferrer: facetResult.topReferrer,
    };
  }

  static async deactivateUrlService(shortCode) {
    const record = await Url.findOneAndUpdate(
      { shortCode, isActive: true },
      { isActive: false },
      { new: true },
    );

    if (!record)
      throw new AppError(
        "URL not found or already deactivated",
        404,
        "URL_NOT_FOUND",
      );

    return record;
  }

  //   END OF CLASS
}
