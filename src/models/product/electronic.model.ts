import { Schema, model } from "mongoose";
import { IElectronic } from "types";

const DOCUMENT_NAME = "Electronic";
const COLLECTION_NAME = "Electronics";

const electronicSchema = new Schema<IElectronic>(
  {
    manufactorer: {
      type: String,
      required: true,
    },
    model: String,
    color: String,
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

export const electronicsModel = model(DOCUMENT_NAME, electronicSchema);
