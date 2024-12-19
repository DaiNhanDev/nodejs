import { Types } from "mongoose";
import { Entity } from "types";

export interface IChannel extends Entity {
  userId: Types.ObjectId;
  channel_name: string;
  channel_type: string;
}
