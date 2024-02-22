import { Schema } from "mongoose";
import { mongoose } from "mongoose";
//Model for cryptocurrency data
const cryptoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Cryptocurrency = mongoose.model("Cryptocurrency", cryptoSchema);
