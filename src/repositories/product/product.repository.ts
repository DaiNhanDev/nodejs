import { BadRequestError } from "../../utils/error.response";
import { productModel } from "../../models";

import { IProduct } from "../../types";
import { getSelectData, getUnSelectData } from "../../utils";
import { ProductBaseRepository } from "./product-base.repository";

interface IProductRepository {
  create(
    params: Omit<IProduct, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IProduct>;

  queryProduct({ query, limit, skip }): Promise<IProduct[]>;

  searchProductByUser({ query }): Promise<IProduct[]>;

  publishProductByShop({ product_shop, product_id }): Promise<number>;
  unPublishProductByShop({ product_shop, product_id }): Promise<number>;
  findAllProducts({
    filter,
    limit,
    skip,
    sort,
    select,
    page,
  }): Promise<IProduct[]>;
  findProduct({ product_id }): Promise<IProduct>;
}

class ProductRepository
  extends ProductBaseRepository
  implements IProductRepository
{
  create(
    params: Omit<IProduct, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IProduct> {
    return new Promise((resolve, reject) =>
      productModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  queryProduct({ query, limit = 50, skip = 0 }): Promise<IProduct[]> {
    return new Promise((resolve, reject) =>
      productModel
        .find(query)
        .populate("product_shop", "name email -_id")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  publishProductByShop({ product_shop, product_id }): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const founShop = await productModel.findOne({
          product_shop,
          _id: product_id,
        });

        if (!founShop) throw new BadRequestError();

        founShop.is_draft = false;
        founShop.is_published = true;
        const { modifiedCount } = await founShop.updateOne(founShop);
        return resolve(modifiedCount);
      } catch (error) {
        return reject(error);
      }
    });
  }

  unPublishProductByShop({ product_shop, product_id }): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const founShop = await productModel.findOne({
          product_shop,
          _id: product_id,
        });

        if (!founShop) return resolve(null);

        founShop.is_draft = true;
        founShop.is_published = false;
        const { modifiedCount } = await founShop.updateOne(founShop);

        return resolve(modifiedCount);
      } catch (error) {
        return reject(error);
      }
    });
  }

  searchProductByUser({ query = "" }): Promise<IProduct[]> {
    return new Promise((resolve, reject) =>
      productModel
        .find(
          { $text: { $search: query }, is_published: true },
          { score: { $meta: "textScore" } },
          { lean: true },
        )
        .sort({ score: { $meta: "textScore" } })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findAllProducts({
    filter = null,
    sort = null,
    limit = 50,
    select = [],
    page = 1,
  }): Promise<IProduct[]> {
    const skip = (page - 1) * limit;
    return new Promise((resolve, reject) =>
      productModel
        .find(filter)
        .sort({ _id: sort === "ctime" ? -1 : 1 })
        .skip(skip)
        .select(getSelectData(select))
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findProduct({ product_id, unSelect }): Promise<IProduct> {
    return new Promise((resolve, reject) =>
      productModel
        .findById(product_id)
        .select(getUnSelectData(unSelect))
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const productRepository = new ProductRepository();

export { productRepository };
