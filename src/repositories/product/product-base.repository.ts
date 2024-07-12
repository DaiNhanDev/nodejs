import { Model } from "mongoose";

import { IProduct, ProductType } from "../../types";

interface IUpdatePropduct {
  model: Model<IProduct | ProductType>;
  product_id: string;
  payload: Partial<IProduct> | Partial<ProductType>;
  isNew?: boolean;
}

interface IProductBaseRepository {
  updateProductById(params: IUpdatePropduct): Promise<IProduct | ProductType>;
}

class ProductBaseRepository implements IProductBaseRepository {
  updateProductById({
    model,
    product_id,
    payload,
    isNew = true,
  }: IUpdatePropduct): Promise<IProduct | ProductType> {
    return new Promise((resolve, reject) =>
      model
        .findByIdAndUpdate(product_id, payload, { new: isNew })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

export { ProductBaseRepository };
