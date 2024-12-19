import { Types } from "mongoose";
import { Entity } from "types";
import { IClothing } from "./clothing";
import { IElectronic } from "./electronic";

export type ProductType = IClothing | IElectronic;
export interface IProduct extends Entity {
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_slug?: string | null;
  product_ratings_average?: number | null;
  product_type: "Electronics" | "Clothing";
  product_shop: Types.ObjectId;
  product_attibutes: ProductType;
  product_variations?: string[];
  is_draft: boolean;
  is_published: boolean;
}

export { IClothing, IElectronic };
