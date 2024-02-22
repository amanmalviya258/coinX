// src/api/controllers/companyController.js
import  CompanyService  from '../../services/companyService.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const companyController = {}; 

companyController.getCompanyHoldings = asyncHandler(async (req, res) => {
  const currency = req.body.currency;

  const holdings = await CompanyService.fetchPublicTreasuryHoldings(currency);

  res.json(new ApiResponse(200, holdings)); 
});

export default companyController; 
