import { Types } from "mongoose";
import { IBase } from "types";

export interface IChannel extends IBase {
  userId: Types.ObjectId;
  channel_name: string;
  channel_type: string;
}
