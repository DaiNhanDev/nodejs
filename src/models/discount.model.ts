import mongoose from "mongoose";
import { IDiscount } from "../types";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";
const discountySchema = new mongoose.Schema<IDiscount>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "fixed_amount",
    },
    value: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    max_users: {
      type: Number,
      required: true,
    },
    uses_count: {
      type: Number,
      required: true,
    },
    users_used: {
      type: [{ type: String }],
      default: [],
    },
    uses_per_user: {
      type: Number,
      required: true,
    },
    min_order_value: {
      type: Number,
      required: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    applies_to: {
      type: String,
      required: true,
      enum: ["all", "specific"],
    },
    product_ids: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const discountyModel = model(DOCUMENT_NAME, discountySchema);
