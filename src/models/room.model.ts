import mongoose from "mongoose";
import { IRoom } from "../types";

const { Schema, model } = mongoose;

const DOCUMENT_NAME = "Room";
const COLLECTION_NAME = "Rooms";
const roomSchema = new mongoose.Schema<IRoom>(
  {
    user_ids: {
      type: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
      default: []
    },
    room_id: {
      type: String,
      required: true,
    },
    room_name: {
      type: String,
      required: true,
    },
    room_type: {
      type: String,
      default: 'chatter'
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const roomModel = model(DOCUMENT_NAME, roomSchema);
