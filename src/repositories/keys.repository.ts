import { keyTokenModel } from "../models";
import { IKeys } from "../types";

interface IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">
  ): Promise<IKeys>;
}

class KeyRepository implements IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">
  ): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .create(params)
        .then((data) => {
          console.log("==> DATA: ", data);
          return resolve(data);
        })
        .catch((error) => reject(error))
    );
  }
}

const keyRepository = new KeyRepository();

export { keyRepository };
