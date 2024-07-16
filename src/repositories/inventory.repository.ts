import { inventoryModel } from "../models";
import { IInventory } from "../types";

interface IInventoryRepository {
  create(
    inventory: Partial<Omit<IInventory, "_id" | "createdAt" | "updatedAt">>,
  ): Promise<IInventory>;
}

class InventoryRepository implements IInventoryRepository {
  create(
    inventory: Partial<Omit<IInventory, "_id" | "createdAt" | "updatedAt">>,
  ): Promise<IInventory> {
    return new Promise((resolve, reject) =>
      inventoryModel
        .create(inventory)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const inventoryRepository = new InventoryRepository();

export { inventoryRepository, IInventoryRepository };
