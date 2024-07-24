import mongoose from "mongoose";
import { IChannel } from "../types";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Channel";
const COLLECTION_NAME = "Channels";
const channelSchema = new mongoose.Schema<IChannel>(
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
    channel_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const channelModel = model(DOCUMENT_NAME, channelSchema);
