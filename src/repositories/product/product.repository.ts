import { productModel } from "../../models";

import { IProduct, IClothing, IElectronic } from "../../types";

interface IProductRepository {
  create(
    params: Omit<
      IProduct<IClothing | IElectronic>,
      "_id" | "createdAt" | "updatedAt"
    >,
  ): Promise<IProduct<IClothing | IElectronic>>;

  findAllDraftForShop({
    query,
    limit,
    skip,
  }): Promise<IProduct<IClothing | IElectronic>[]>;

  publishProductByShop({
    product_shop,
    product_id,
  }): Promise<IProduct<IClothing | IElectronic>[]>;

  findAllPublishedForShop({
    query,
    limit,
    skip,
  }): Promise<IProduct<IClothing | IElectronic>[]>;

  queryProduct({
    query,
    limit,
    skip,
  }): Promise<IProduct<IClothing | IElectronic>[]>;

  searchProductByUser({ query }): Promise<IProduct<IClothing | IElectronic>[]>;
}

class ProductRepository implements IProductRepository {
  create(
    params: Omit<
      IProduct<IClothing | IElectronic>,
      "_id" | "createdAt" | "updatedAt"
    >,
  ): Promise<IProduct<IClothing | IElectronic>> {
    return new Promise((resolve, reject) =>
      productModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findAllPublishedForShop({
    query,
    limit,
    skip,
  }): Promise<IProduct<IClothing | IElectronic>[]> {
    return new Promise((resolve, reject) =>
      productModel
        .find(query)
        .populate("product_shop", "name email -_id")
        .skip(skip)
        .limit(limit)
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findAllDraftForShop({
    query,
    limit,
    skip,
  }): Promise<IProduct<IClothing | IElectronic>[]> {
    return new Promise((resolve, reject) =>
      productModel
        .find(query)
        .populate("product_shop", "name email -_id")
        .skip(skip)
        .limit(limit)
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  queryProduct({
    query,
    limit = 50,
    skip = 0,
  }): Promise<IProduct<IClothing | IElectronic>[]> {
    return new Promise((resolve, reject) =>
      productModel
        .find(query)
        .populate("product_shop", "name email -_id")
        .skip(skip)
        .limit(limit)
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  publishProductByShop({
    product_shop,
    product_id,
  }): Promise<IProduct<IClothing | IElectronic>[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const founShop = await productModel.findOne({
          product_shop,
          _id: product_id,
        });

        if (!founShop) return resolve(null);

        founShop.is_draft = false;
        founShop.is_published = true;
        const { modifiedCount } = await founShop.updateOne(founShop);
        return resolve(modifiedCount);
      } catch (error) {
        return reject(error);
      }
    });
  }

  unPublishProductByShop({
    product_shop,
    product_id,
  }): Promise<IProduct<IClothing | IElectronic>[]> {
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

  searchProductByUser({ query }): Promise<IProduct<IClothing | IElectronic>[]> {
    return new Promise((resolve, reject) =>
      productModel
        .find(
          { $text: { $search: query } },
          { score: { $meta: "textScore" } },
          { lean: true },
        )
        .sort({ score: { $meta: "textScore" } })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const productRepository = new ProductRepository();

export { productRepository };
