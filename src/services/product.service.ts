import { BadRequestError } from "utils/error.response";
import {
  productModel,
  clothingsModel,
  electronicsModel,
} from "../models/product.model";
import { IProduct, IClothing, IElectronic } from "../types";

class Product {
  product_name;
  product_thumb;
  product_description;
  product_price;
  product_quantity;
  product_type;
  product_attibutes;
  shopId;

  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_attibutes,
    shopId,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_attibutes = product_attibutes;
    this.shopId = shopId;
  }

  async createProduct() {
    return await productModel.create(this);
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothingsModel.create(this.product_attibutes);
    if (!newClothing) throw new BadRequestError();

    const newProduct = await super.createProduct();

    if (!newProduct) throw new BadRequestError();

    return newProduct;
  }
}
class Electronics extends Product {
  async createProduct() {
    const newElectronics = await electronicsModel.create(
      this.product_attibutes
    );
    if (!newElectronics) throw new BadRequestError();

    const newProduct = await super.createProduct();

    if (!newProduct) throw new BadRequestError();

    return newProduct;
  }
}

class ProductFactory {
  static productRegistry = {};
  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError();

    return new productClass(payload).createProduct();
  }
}

ProductFactory.registerProductType("Electronics", Electronics);
ProductFactory.registerProductType("Clothing", Clothing);
