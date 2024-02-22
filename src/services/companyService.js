// src/services/CompanyService.js
import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';

class CompanyService {
  async fetchPublicTreasuryHoldings(currency) {
    try {
      if (currency !== "bitcoin" && currency !== "ethereum") {
        throw new ApiError(400, "Invalid currency. Only 'bitcoin' and 'ethereum' are supported");
      }

      const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
      const holdings = response.data.companies;

      // Assuming 'companies' is the key in the response containing the list
      return holdings;

    } catch (error) {
      logger.error('Error fetching public treasury data from CoinGecko:', error);

      if (error.response) { 
        throw new ApiError(error.response.status, error.response.data.error);
      } else {
        throw new ApiError(500, "Error fetching public treasury data");
      }
    }
  }
}

export default new CompanyService(); 
