import { productModel } from "../../models";
import { productRepository } from "../../repositories";

export class ProductBase {
  product_name;
  product_thumb;
  product_description;
  product_price;
  product_quantity;
  product_type;
  product_attibutes;
  product_shop;
  is_draft;
  is_published;
  product_variations;

  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_attibutes,
    product_shop,
    is_draft,
    is_published,
    product_variations = [],
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_attibutes = product_attibutes;
    this.product_shop = product_shop;
    this.is_draft = is_draft;
    this.is_published = is_published;
    this.product_variations = product_variations;
  }

  async createProduct(product_id) {
    return await productRepository.create({
      ...this,
      _id: product_id,
    });
  }

  async updateProductById(product_id, payload) {
    return await productRepository.updateProductById({
      product_id,
      payload,
      model: productModel,
    });
  }
}