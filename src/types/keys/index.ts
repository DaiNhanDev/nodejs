import { Schema } from "mongoose";
import { IBase } from "types";

export interface IKeys extends IBase {
  userId: Schema.Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed: string[];
}
