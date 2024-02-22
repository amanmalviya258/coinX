import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_name } from "../constants.js";
import { job }  from "../jobs/updateCryptoListJob.js";
dotenv.config();
const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONDODB_URI}/${DB_name}`
    );
   // console.log(ConnectionInstance)
    console.log(`Connected to ${DB_name}`);
   job();
    // console.log(
    //   "please wait db is getting populated with cryptoCurrencies data"
    // );
   // console.log(`${process.env.MONDODB_URI}/${DB_name}`)
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
