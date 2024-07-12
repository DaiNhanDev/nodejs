import { Schema, model } from "mongoose";
import { IClothing } from "types";

const DOCUMENT_NAME = "Clothing";
const COLLECTION_NAME = "Clothes";
const clothingSchema = new Schema<IClothing>(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const clothingsModel = model(DOCUMENT_NAME, clothingSchema);
