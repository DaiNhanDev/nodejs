import { BadRequestError } from "../../utils/error.response";
import { Electronic } from "./electronic.service";
import { Clothing } from "./clothing.service";
import { productRepository } from "../../repositories";

const CLASS_REF = {
  Electronic,
  Clothing,
};
type Categories = keyof typeof CLASS_REF;
export class ProductFactory {
  static productRegistry = {};
  static repositoryRegistry = {};
  static registerProductType() {
    Object.keys(CLASS_REF).forEach((key: Categories) => {
      ProductFactory.productRegistry[key] = CLASS_REF[key];
    });
  }

  static async createProduct(type: Categories, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError();

    return new productClass(payload).createProduct();
  }

  static async findAllDraftForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, is_draft: true };
    return await productRepository.queryProduct({
      query,
      limit,
      skip,
    });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, is_published: true };
    return await productRepository.queryProduct({
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

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await productRepository.unPublishProductByShop({
      product_shop,
      product_id,
    });
  }

  static async searchProduct({ search }) {
    return await productRepository.searchProductByUser({
      query: search,
    });
  }

  static async findAllProducts({ filter, select, sort, page, limit }) {
    return await productRepository.findAllProducts({
      filter,
      select,
      sort,
      page,
      limit,
    });
  }

  static async findProduct({ product_id, unSelect }) {
    return await productRepository.findProduct({
      product_id,
      unSelect: [...unSelect, "__v"],
    });
  }

  static async updateProductById({ type, payload, product_id }) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new BadRequestError();

    return new productClass(payload).updateProductById(product_id);
  }
}

ProductFactory.registerProductType();
