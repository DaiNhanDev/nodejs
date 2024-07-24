import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "AgoraToken";
const COLLECTION_NAME = "AgoraTokens";
const keySchema = new mongoose.Schema<any>(
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

export const keyTokenModel = model(DOCUMENT_NAME, keySchema);
