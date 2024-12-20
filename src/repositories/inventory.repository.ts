import { inventoryModel } from "../models";
import { IInventory } from "../types";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";

interface IInventoryRepository {}

class InventoryRepository
  extends BaseRepositoryAbstract<IInventory>
  implements IInventoryRepository
{
  constructor(readonly entity: typeof inventoryModel) {
    super(entity);
  }
}

const inventoryRepository = new InventoryRepository(inventoryModel);

export { inventoryRepository, IInventoryRepository };
