import { Model } from "mongoose";

import { Entity, IProduct, ProductType } from "../../types";
import { BaseRepositoryAbstract } from "../base/base.abstract.repository";

interface IUpdatePropduct {
  product_id: string;
  payload: Partial<IProduct> | Partial<ProductType>;
  isNew?: boolean;
}
class ProductBaseRepository<T extends Entity>
  extends BaseRepositoryAbstract<T>
{
  constructor(readonly entity: Model<T>) {
    super(entity);
  }

  updateProductById({ product_id, payload, isNew = true }: IUpdatePropduct) {
    return new Promise((resolve, reject) =>
      this.entity
        .findByIdAndUpdate(product_id, payload, { new: isNew })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
}
export { ProductBaseRepository };
