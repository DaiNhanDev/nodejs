import { keyTokenModel } from "../models";
import { IKeys } from "../types";

interface IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt" | "refreshToken">,
  ): Promise<IKeys>;
}

class KeyRepository implements IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt" | "refreshToken">,
  ): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const keyRepository = new KeyRepository();

export { keyRepository };
