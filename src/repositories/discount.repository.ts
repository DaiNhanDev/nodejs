import { convertToObjectId } from "../utils";
import { discountyModel } from "../models";
import { IDiscount } from "../types";

interface IDiscountRepository {
  create(
    inventory: Partial<Omit<IDiscount, "_id" | "createdAt" | "updatedAt">>
  ): Promise<IDiscount>;
  findDiscountByCode(code: string, shopId: string): Promise<IDiscount>;
  findAllDiscountByCodes(code: string, shopId: string): Promise<IDiscount>;
}

class DiscountRepository implements IDiscountRepository {
  create(
    inventory: Partial<Omit<IDiscount, "_id" | "createdAt" | "updatedAt">>
  ): Promise<IDiscount> {
    return new Promise((resolve, reject) =>
      discountyModel
        .create(inventory)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }

  findDiscountByCode(code: string, shopId: string): Promise<IDiscount> {
    return new Promise((resolve, reject) =>
      discountyModel
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

const discountRepository = new DiscountRepository();

export { discountRepository, IDiscountRepository };
