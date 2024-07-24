import { Types } from "mongoose";
import { IBase } from "types";

export interface IRoom extends IBase {
  user_ids: Types.ObjectId[];
  room_id: string;
  room_name: string;
  room_type: 'chatter' | 'livestream'; 
}
