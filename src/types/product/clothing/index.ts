import { Types } from "mongoose";
import { Entity } from "types";

export interface IClothing extends Entity {
  brand: string;
  size: string;
  material: string;
  product_shop: Types.ObjectId;
}
