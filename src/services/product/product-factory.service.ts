import { BadRequestError } from "../../utils/error.response";
import { Electronic } from "./electronic.service";
import { Clothing } from "./clothing.service";
import { productRepository } from "../../repositories";

const CLASS_REF = {
  Electronic,
  Clothing,
};
export class ProductFactory {
  static productRegistry = {};
  static registerProductType() {
    Object.keys(CLASS_REF).forEach((key) => {
      ProductFactory.productRegistry[key] = CLASS_REF[key];
    });
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError();

    return new productClass(payload).createProduct();
  }

  static async findAllDraftForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, is_draft: true };
    return await productRepository.findAllDraftForShop({
      query,
      limit,
      skip,
    });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, is_published: true };
    return await productRepository.findAllDraftForShop({
      query,
      limit,
      skip,
    });
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await productRepository.publishProductByShop({
      product_shop,
      product_id,
    });
  }

  static async searchProduct({ search }) {
    return await productRepository.searchProductByUser({
      query: search,
    });
  }
}

ProductFactory.registerProductType();
