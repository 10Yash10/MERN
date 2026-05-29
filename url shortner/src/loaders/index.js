import expressLoader from "./express.js";
import mongooseLoader from "./mongoose.js";

export default async (expressApp) => {
  await expressLoader(expressApp);
  await mongooseLoader();
};
