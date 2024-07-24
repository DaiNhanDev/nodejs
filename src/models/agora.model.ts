import mongoose from "mongoose";
import { IAgora } from "../types";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "AgoraToken";
const COLLECTION_NAME = "AgoraTokens";
const agoraSchema = new mongoose.Schema<IAgora>(
  {
    agoraToken: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Channel",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const agoraModel = model(DOCUMENT_NAME, agoraSchema);
