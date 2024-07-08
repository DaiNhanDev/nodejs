import { Types } from "mongoose";
import { IBase } from "types";

export * from './clothing';
export * from './electronic';

export interface IProduct<T> extends IBase {
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_type: 'Electronics' | 'Clothing';
  shopId: Types.ObjectId;
  product_attibutes: T;
}

