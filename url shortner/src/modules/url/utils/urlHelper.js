import crypto from "crypto";

export const normalizeUrl = (inputUrl) => {
  console.log(inputUrl);
  const parsed = new URL(inputUrl);
  console.log("parsed: ", parsed);

  //   fetching hostname and converting it to lowercase
  let hostname = parsed.hostname.toLowerCase();

  //   remove www from starting.
  if (hostname.startsWith("www")) {
    hostname = hostname.replace("www", "");
  }

  let pathname = parsed.pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return `${parsed.protocol}//${hostname}${pathname}${parsed.search}`;
};

export const generateShortCode = (length = 7) => {
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  const bytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    code += alphabet[bytes[i] % alphabet.length];
  }

  return code;
};
