import { Types } from "mongoose";
import { IBase } from "types";

export interface IElectronic extends IBase {
  manufactorer: string;
  model: string;
  color: string;
  product_shop: Types.ObjectId;
}
