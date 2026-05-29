import crypto from "crypto";
export const hashString = (text) => {
  if (!text) return null;

  return crypto.createHash("sha256").update(text).digest("hex");
};
