import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,POST,DELETE",
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // responsible for parsing the URL-encoded data in the body of the request
app.use(express.static("public"));


import cryptoRoutes from "../src/api/routes/cryptoRoutes.js";
import companyRoutes from '../src/api/routes/companyRoute.js'

app.use("/api/crypto", cryptoRoutes);
//use this json body in this post request for testing api
//{
// "fromCurrency": "bitcoin",
// "toCurrency": "eth",
// "date": "15-12-2023"
// }
//api route : http://localhost:8000/api/crypto/convert

//possible "toCurrency" values that will work : ["aed","ars","aud","bch","bdt","bhd","bmd","bnb","brl","btc","cad","chf","clp","cny","czk","dkk","dot","eos","eth","eur","gbp","gel","hkd","huf","idr","ils","inr","jpy","krw","kwd","lkr","ltc","mmk","mxn","myr","ngn","nok","nzd","php","pkr","pln","rub","sar","sek","sgd","thb","try","twd","uah","usd","vef","vnd","xag","xau","xdr","xlm","xrp","yfi","zar","bits","link","sats"]



app.use('/api/company', companyRoutes); 
//use this json body in this post request for testing api
// {
//  "currency": "ethereum" 
//}
//api route : http://localhost:8000/api/company/holdings


export { app };
