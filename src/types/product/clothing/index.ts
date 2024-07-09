import { Types } from "mongoose";
import { IBase } from "types";

export interface IClothing extends IBase {
  brand: string;
  size: string;
  material: string;
  product_shop: Types.ObjectId;
}
