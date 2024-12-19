import { Types } from "mongoose";
import { Entity } from "types";

export interface IKeys extends Entity {
  userId: Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
  refreshTokensUsed: string[];
}
