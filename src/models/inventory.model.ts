import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";
const invetorySchema = new mongoose.Schema<any>(
  {
    inven_productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    inven_location: {
      type: String,
      default: "unKnow",
    },
    inven_stock: {
      type: Number,
      require: true,
    },
    inven_shopId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    inven_reservations: {
      type: [{ type: String }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const inventory = model(DOCUMENT_NAME, invetorySchema);
