KoinX (Root Project Folder)
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── cryptoController.js
│   │   │   └── companyController.js
│   │   ├── middlewares/  
│   │   │   └──  
│   │   ├── models/
│   │   │   ├── Crypto.js
│   │   │   └── Company.js
│   │   └── routes/
│   │       ├── cryptoRoutes.js
│   │       └── companyRoutes.js
│   ├── db/
│   │   ├── models/ 
│   │   │   ├── Crypto.js
│   │   │   └── Company.js
│   │   └── db.js
│   ├── services/
│   │   ├── CurrencyConversionService.js
│   │   └── companyService.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── logger.js
├── app.js 
├── constants.js
├── index.js
├── .env 
├── package.json 
└── README.md 


Endpoints.

/api/crypto/convert
Method: POST
Schema:
JSON
{
    "fromCurrency": "bitcoin", 
    "toCurrency": "ethereum", 
    "date": "15-12-2023" 
}
Description: Calculates conversion rates between cryptocurrencies.
/api/company/holdings
Method: POST
Schema:
JSON
{
    "currency": "bitcoin" 
}
Description: Gets a list of companies holding a specified cryptocurrency.


Code Flow

API Request: User/client sends a request to one of the defined endpoints.
Routing: The app.js routes the request to appropriate controller based on the URL pattern (defined in routes/).
Controller: Controller logic executes.
Input validation
Calls necessary service function(s)
Formats the response (using ApiResponse).
Service: Service functions perform core logic.
Calls external APIs (e.g., CurrencyConversionService calling CoinGecko)
Processes and potentially saves data (e.g., with MongoDB).
Response: The formatted response is sent back to the client.