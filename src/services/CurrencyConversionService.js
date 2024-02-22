//Service for handling currency conversions
import axios from "axios";
import { ApiError } from "../utils/ApiError.js";

class CurrencyConversionService {
  async calculateConversionRate(fromCurrency, toCurrency, date) {
    try {
      console.log(fromCurrency, toCurrency, date);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`
      );
      console.log(response);
      const historicalPrice =
        response.data.market_data.current_price[toCurrency.toLowerCase()];

      if (!historicalPrice) {
        throw new ApiError(404, "Price data not found for the given date");
      }

      return historicalPrice;
    } catch (error) {
      if (error.response) {
        throw new ApiError(error.response.status, error.response.data.error);
      } else {
        throw new ApiError(500, "Error fetching price data from CoinGecko");
      }
    }
  }
}

export default new CurrencyConversionService();
