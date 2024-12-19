import { Types } from "mongoose";
import { Entity } from "types";

export interface IInventory extends Entity {
  productId: Types.ObjectId;
  location: string;
  stock: number;
  shopId:  Types.ObjectId;
  reservations: string[];
}
