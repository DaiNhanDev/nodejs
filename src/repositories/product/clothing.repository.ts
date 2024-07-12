import { clothingsModel } from "../../models";

import { IClothing } from "../../types";
import { ProductBaseRepository } from "./product-base.repository";

interface IClothingRepository {
  create(
    params: Omit<IClothing, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IClothing>;

  // update(productId, payload): Promise<IClothing>;
}

class ClothingRepository
  extends ProductBaseRepository
  implements IClothingRepository
{
  create(
    params: Omit<IClothing, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IClothing> {
    return new Promise((resolve, reject) =>
      clothingsModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const clothingRepository = new ClothingRepository();

export { clothingRepository, ClothingRepository };
