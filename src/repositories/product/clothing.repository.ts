import { clothingsModel } from "../../models";

import { IClothing } from "../../types";
import { ProductBaseRepository } from "./product-base.repository";

interface IClothingRepository {}

class ClothingRepository
  extends ProductBaseRepository<IClothing>
  implements IClothingRepository
{
  constructor(readonly entity: typeof clothingsModel) {
    super(entity);
  }
}

const clothingRepository = new ClothingRepository(clothingsModel);

export { clothingRepository, ClothingRepository };
