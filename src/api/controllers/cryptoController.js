import moment from 'moment'; 
import  CurrencyConversionService  from '../../services/CurrencyConversionService.js';
import { ApiError } from '../../utils/ApiError.js'; 
import { ApiResponse } from '../../utils/ApiResponse.js'; 
import { asyncHandler } from '../../utils/asyncHandler.js';

export const convertPrice = asyncHandler(async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body;

    // Input Validation
    if (!fromCurrency || !toCurrency) {
        throw new ApiError(400, 'Both fromCurrency and toCurrency are required');
    }

    if (!isValidDate(date)) {
        throw new ApiError(400, 'Invalid date format. Please use DD-MM-YYYY');
    }

    const conversionRate = await CurrencyConversionService.calculateConversionRate(
        fromCurrency, toCurrency, date
    );

    res.json(new ApiResponse(200, { price: conversionRate })); 
});

function isValidDate(dateString) {
    const dateFormat = "DD-MM-YYYY"
    const dateObj = moment(dateString, dateFormat);  
    // Ensure date is valid and not in the future 
    return dateObj.isValid() && dateObj.isSameOrBefore(moment(), 'day'); 
}

