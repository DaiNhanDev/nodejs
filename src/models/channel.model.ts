import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Channel";
const COLLECTION_NAME = "Channels";
const keySchema = new mongoose.Schema<any>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    channel_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const keyTokenModel = model(DOCUMENT_NAME, keySchema);
