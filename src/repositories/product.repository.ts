import { productModel } from "../models";

import { IProduct, IClothing, IElectronic } from "../types";

interface IProductRepository {
  create(
    params: Omit<
      IProduct<IClothing | IElectronic>,
      "_id" | "createdAt" | "updatedAt"
    >
  ): Promise< IProduct<IClothing | IElectronic>>;
}

class ProductRepository implements IProductRepository {
  create(
    params: Omit< IProduct<IClothing | IElectronic>, "_id" | "createdAt" | "updatedAt">
  ): Promise< IProduct<IClothing | IElectronic>> {
    return new Promise((resolve, reject) =>
      productModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
}

const productRepository = new ProductRepository();

export { productRepository };
