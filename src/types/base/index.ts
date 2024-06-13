import { Schema } from "mongoose";

export interface IBase {
  id: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
}