import { shopModel } from "../models";
import { IShop } from "../types";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";
interface IShopRepository {
  shopExist(email: string): Promise<boolean>;
}

class ShopRepository
  extends BaseRepositoryAbstract<IShop>
  implements IShopRepository
{
  constructor(readonly entity: typeof shopModel) {
    super(entity);
  }

  shopExist(email: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      this.entity
        .findOne({ email })
        .lean()
        .then((emailExist) => resolve(!!emailExist._id))
        .catch((error) => reject(error))
    );
  }
}

const shopRepository = new ShopRepository(shopModel);

export { shopRepository, IShopRepository };
