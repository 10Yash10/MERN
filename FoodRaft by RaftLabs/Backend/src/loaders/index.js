import cron from "./cron.js";
import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";

export default async (expressApp) => {
  await expressLoader(expressApp);
  await mongooseLoader();
  await cron();
};
