import { Schema, Model, model } from "mongoose";
import { IApiKeys } from "types";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";
const apiKeySchema = new Schema<IApiKeys, Model<IApiKeys>>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      require: true,
      enum: ["0000", "1111", "2222"],
    },
    // expired: {
    //   type: Date,
    //   default: Date.now(),
    //   expires: '30d'
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    //   expires: "30d",
    // },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export const apiKeyModel = model(DOCUMENT_NAME, apiKeySchema);
