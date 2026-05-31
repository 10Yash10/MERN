import { Url } from "../model/Url.js";
import { hashString } from "../../../shared/utils/crypto.js";
import { generateShortCode, normalizeUrl } from "../utils/urlHelper.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class UrlService {
  static async shortenUrl(payload, clientIp) {
    console.log(payload, clientIp);
    const { url, customAlias, expiresInHour } = payload.data;
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

      finalShortCode = isCustom;
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

    const expiresAt = expiresInHour
      ? new Date(Date.now() + expiresInHour * 60 * 60 * 1000)
      : null;

    const newUrlRecord = await Url.create({
      shortCode: finalShortCode,
      originalUrl: url,
      normalizedUrl: normalizeUrl,
      customAlias: isCustom ? customAlias : null,
      isCustomAlias: isCustom,
      expiresAt,
      createdByIpHash: ipHash,
    });

    return newUrlRecord;
    // END OF SHORTENURL FUNCTION
  }
  //   END OF CLASS
}
