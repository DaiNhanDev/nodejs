import { convertToObjectId } from "../utils";
import { discountyModel } from "../models";
import { IDiscount } from "../types";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";

interface IDiscountRepository {
  findDiscountByCode(code: string, shopId: string): Promise<IDiscount>;
  findAllDiscountByCodes(code: string, shopId: string): Promise<IDiscount>;
}

class DiscountRepository
  extends BaseRepositoryAbstract<IDiscount>
  implements IDiscountRepository
{
  constructor(readonly entity: typeof discountyModel) {
    super(entity);
  }

  findDiscountByCode(code: string, shopId: string): Promise<IDiscount> {
    return new Promise((resolve, reject) =>
      this.entity
        .findOne({
          code,
          shopId: convertToObjectId(shopId),
        })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }

  findAllDiscountByCodes(code: string, shopId: string): Promise<IDiscount> {
    return new Promise((resolve, reject) =>
      discountyModel
        .findOne({
          code: code,
          shopId: convertToObjectId(shopId),
        })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
}

const discountRepository = new DiscountRepository(discountyModel);

export { discountRepository, IDiscountRepository };
