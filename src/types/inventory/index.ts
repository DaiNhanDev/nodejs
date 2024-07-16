import { Types } from "mongoose";
import { IBase } from "types";

export interface IInventory extends IBase {
  productId: Types.ObjectId;
  location: string;
  stock: number;
  shopId:  Types.ObjectId;
  reservations: string[];
}
