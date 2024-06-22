import { shopModel } from "../models";
import { IShop } from "../types";

interface IShopRepository {
  shopExist(email: string): Promise<boolean>;
  createShop(
    shop: Omit<IShop, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IShop>;
  findByEmail(email: string, select): Promise<IShop>;
}

class ShopRepository implements IShopRepository {
  findByEmail(
    email: string,
    select = {
      email: 1,
      password: 1,
      name: 1,
      roles: 1,
    },
  ): Promise<IShop> {
    return new Promise((resolve, reject) =>
      shopModel
        .findOne({ email })
        .select(select)
        .lean()
        .then((shop) => resolve(shop))
        .catch((error) => reject(error)),
    );
  }
  createShop(
    shop: Omit<IShop, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IShop> {
    return new Promise((resolve, reject) =>
      shopModel
        .create(shop)
        .then((data) => {
          console.log("==> DATA: ", data);
          return resolve(data);
        })
        .catch((error) => reject(error)),
    );
  }
  shopExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      shopModel
        .findOne({ email })
        .lean()
        .then((emailExist) => resolve(!!emailExist))
        .catch((error) => reject(error)),
    );
  }
}

const shopRepository = new ShopRepository();

export { shopRepository, IShopRepository };
