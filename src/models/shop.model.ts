import { Schema, model } from "mongoose";
import { IShop } from "types";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";
const shopSchema = new Schema<IShop>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: [{ type: String }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const shopModel = model(DOCUMENT_NAME, shopSchema);
