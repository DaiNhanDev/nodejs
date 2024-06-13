import { shopModel } from "models";
import { IShop } from "types";

interface IShopRepository {
  shopExist(email: string): Promise<boolean>;
  createShop(shop: Omit<IShop, 'id' | 'createdAt' | 'updatedAt'>): Promise<any>;
}

class ShopRepository implements IShopRepository {
  createShop(shop: Omit<IShop, 'id' | 'createdAt' | 'updatedAt'>): Promise<IShop> {
    return new Promise((resolve, reject) =>
      shopModel
        .create(shop)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
  shopExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      shopModel
        .find({ email })
        .lean()
        .then((emailExist) => resolve(!!emailExist))
        .catch((error) => reject(error))
    );
  }
}

const shopRepository = new ShopRepository();

export { shopRepository };
