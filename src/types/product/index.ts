import { Types } from "mongoose";
import { IBase } from "types";

export * from "./clothing";
export * from "./electronic";

export interface IProduct<T> extends IBase {
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_slug?: string | null;
  product_ratings_average?: number | null;
  product_type: "Electronics" | "Clothing";
  product_shop: Types.ObjectId;
  product_attibutes: T;
  product_variations?: string[];
  is_draft: boolean;
  is_published: boolean;
}
