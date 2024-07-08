import { Schema, model } from "mongoose";
import { IProduct, IElectronic, IClothing } from "types";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const productSchema = new Schema<IProduct<IElectronic | IClothing>>(
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
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_attibutes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const clothingSchema = new Schema<IClothing>(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
  },
  {
    timestamps: true,
    collection: "clothes",
  }
);

const electronicSchema = new Schema<IElectronic>(
  {
    manufactorer: {
      type: String,
      required: true,
    },
    model: String,
    color: String,
  },
  {
    timestamps: true,
    collection: "electronics",
  }
);

// const furnitureSchema = new Schema<any>(
//   {
//     manufactorer: {
//       type: String,
//       required: true,
//     },
//     model: String,
//     color: String
//   },
//   {
//     timestamps: true,
//     collection: 'furnitures',
//   }
// );

export const productModel = model(DOCUMENT_NAME, productSchema);
export const clothingsModel = model("Clothings", clothingSchema);
export const electronicsModel = model("Electronics", electronicSchema);
// export const furnituresModel = model('Furnitures', furnitureSchema);
