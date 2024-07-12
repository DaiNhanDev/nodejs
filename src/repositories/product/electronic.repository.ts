import { electronicsModel } from "../../models";

import { IElectronic } from "../../types";
import { ProductBaseRepository } from "./product-base.repository";

interface IElectronicRepository {
  create(
    params: Omit<IElectronic, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IElectronic>;
}

class ElectronicRepository
  extends ProductBaseRepository
  implements IElectronicRepository
{
  create(
    params: Omit<IElectronic, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IElectronic> {
    return new Promise((resolve, reject) =>
      electronicsModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const electronicRepository = new ElectronicRepository();

export { electronicRepository, ElectronicRepository };
