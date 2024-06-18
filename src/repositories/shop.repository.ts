import { shopModel } from "models";
import { IShop } from "types";

interface IShopRepository {
  shopExist(email: string): Promise<boolean>;
  createShop(
    shop: Omit<IShop, "_id" | "createdAt" | "updatedAt">
  ): Promise<IShop>;
}

class ShopRepository implements IShopRepository {
  createShop(
    shop: Omit<IShop, "_id" | "createdAt" | "updatedAt">
  ): Promise<IShop> {
    return new Promise((resolve, reject) =>
      shopModel
        .create(shop)
        .then((data) => {
          console.log("==> DATA: ", data);
          return resolve(data);
        })
        .catch((error) => reject(error))
    );
  }
  shopExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      shopModel
        .findOne({ email })
        .lean()
        .then((emailExist) => {
          console.log("====>emailExist ", emailExist);
          return resolve(!!emailExist);
        })
        .catch((error) => reject(error))
    );
  }
}

const shopRepository = new ShopRepository();

export { shopRepository };
