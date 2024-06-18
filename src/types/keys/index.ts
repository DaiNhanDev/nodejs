import { Schema } from "mongoose";
import { IBase } from "types";

export interface IKeys extends IBase {
  userId: Schema.Types.ObjectId,
  publicKey: string;
  refreshToken: string[];
}
