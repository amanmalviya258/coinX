import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { Cryptocurrency as Crypto } from "../db/models/Crypto.js";
import { ApiError } from "../utils/ApiError.js";
import cron from "node-cron";
import logger from "../utils/logger.js";
import { fileURLToPath } from "node:url";

const fetchAndStoreCryptos = async () => {
  try {
    console.log("Fetching crypto list...");
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    const cryptoData = response.data;
    console.log(cryptoData);
    await Promise.all(
      cryptoData.map(async (crypto) => {
        await Crypto.updateOne(
          { id: crypto.id },
          { $set: { id: crypto.id, name: crypto.name } }, // using $set for updates ehehehe but still kitna expensive call h
          { upsert: true }
        );
      })
    );
    logger.info("Crypto list updated successfully");
  } catch (error) {
    let apiError;
    if (error.response) {
      apiError = new ApiError(error.response.status, error.response.data.error);
    } else {
      apiError = new ApiError(500, "Internal error updating crypto list");
    }
    logger.error(apiError);
  }
};

export const job = () => {
  // console.log("inside job")
  const task = cron.schedule("10 * * * * *", () => {
    console.log("Updating crypto list...");
    fetchAndStoreCryptos().catch((err) => logger.error("Job Error:", err));
  });
  task.start();
};

const __filename = fileURLToPath(import.meta.url);

//export const __dirname = path.dirname(__filename);

if (import.meta.url === `file://${__filename}`) {
  (async () => {
    await task.start();
  })();
}

// there's no direct equivalent for __filename in the pure ES Module world.
// if (import.meta.url === new URL('file://' + __filename).href) {
//   (async () => {
//     await job.start();
//   })();
// }

