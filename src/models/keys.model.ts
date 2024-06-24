import mongoose from "mongoose";
import { IKeys } from "types";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";
const keySchema = new mongoose.Schema<IKeys>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: [{ type: String }],
      default: [],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const keyTokenModel = model(DOCUMENT_NAME, keySchema);
