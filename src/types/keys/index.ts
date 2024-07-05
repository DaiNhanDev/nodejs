import { Types } from "mongoose";
import { IBase } from "types";

export interface IKeys extends IBase {
  userId: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed: string[];
}
