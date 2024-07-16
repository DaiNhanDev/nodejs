import { Types } from "mongoose";
import { IBase } from "types";

export interface IDiscount extends IBase {
  name: string;
  description: string;
  type: string;
  value: number;
  code: string;
  start: Date;
  end: Date;
  max_users: number;
  uses_count: number;
  users_used: string[];
  uses_per_user: number;
  min_order_value: number;
  shopId: Types.ObjectId;
  is_active: boolean;
  applies_to: "all" | "specific";
  product_ids: Types.ObjectId[];
}
