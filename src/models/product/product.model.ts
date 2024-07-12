import { Schema, model } from "mongoose";
import { IProduct } from "types";
import slugify from "slugify";
import { NextFunction } from "express";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const productSchema = new Schema<IProduct>(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronic", "Clothing", "Furniture"],
    },
    product_attibutes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    product_slug: String,
    product_ratings_average: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be above 5.0"],
      set: (value) => Math.round(value * 10) / 10,
    },
    product_variations: {
      type: [{ type: String }],
      default: [],
    },
    is_draft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    is_published: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

// create index for search
productSchema.index({
  product_name: "text",
  product_description: "text",
});
// Document middleware: run before save data

productSchema.pre("save", function (next: NextFunction) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

export const productModel = model(DOCUMENT_NAME, productSchema);
