import { Types } from "mongoose";
import { Entity } from "types";

export interface IElectronic extends Entity {
  manufactorer: string;
  model: string;
  color: string;
  product_shop: Types.ObjectId;
}
