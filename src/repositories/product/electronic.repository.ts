import { electronicsModel } from "../../models";

import { IElectronic } from "../../types";
import { ProductBaseRepository } from "./product-base.repository";

interface IElectronicRepository {}

class ElectronicRepository
  extends ProductBaseRepository<IElectronic>
  implements IElectronicRepository
{
  constructor(readonly entity: typeof electronicsModel) {
    super(entity);
  }
}

const electronicRepository = new ElectronicRepository(electronicsModel);

export { electronicRepository, ElectronicRepository };
