import { getUnSelectData } from "../utils";
import { shopModel } from "../models";
import { CreatedModel, IShop } from "../types";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
import sizeof from 'object-sizeof'
import { SaveOptions } from "mongoose";
interface IShopRepository {
  shopExist(email: string): Promise<boolean>;
  createShop(
    shop: Omit<IShop, "_id" | "createdAt" | "updatedAt">
  ): Promise<IShop>;
  findShopByEmail(email: string, select): Promise<IShop>;
}

class ShopRepository
  extends BaseRepositoryAbstract<IShop>
  implements IShopRepository
{
  constructor(readonly entity: typeof shopModel) {
    super(entity);
  }

  findShopByEmail(
    email: string,
    select = {
      email: 1,
      password: 1,
      name: 1,
      roles: 1,
    }
  ): Promise<IShop> {
    return new Promise((resolve, reject) =>
      shopModel
        .findOne({ email })
        // .select({ ...select })
        .lean()
        .then((shop) => {
         console.log('====>  shop with Lean: ',  sizeof(shop));
          return resolve(shop);
        })
        .catch((error) => reject(error))
    );
  }

  createShop(
    shop: Omit<IShop, "_id" | "createdAt" | "updatedAt">
  ): Promise<IShop> {
    return new Promise((resolve, reject) =>
      this.entity
        .create(shop)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }

  shopExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      this.entity
        .findOne({ email })
        .lean()
        .then((emailExist) => resolve(!!emailExist))
        .catch((error) => reject(error))
    );
  }
}

const shopRepository = new ShopRepository(shopModel);

export { shopRepository, IShopRepository };
