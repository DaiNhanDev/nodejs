import mongoose from "mongoose";
import { IInventory } from "../types";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";
const invetorySchema = new mongoose.Schema<IInventory>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    location: {
      type: String,
      default: "unKnow",
    },
    stock: {
      type: Number,
      require: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    reservations: {
      type: [{ type: String }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const inventoryModel = model(DOCUMENT_NAME, invetorySchema);
