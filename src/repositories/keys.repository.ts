import { keyTokenModel } from "../models";
import { IKeys } from "../types";

interface IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">
  ): Promise<IKeys>;
  findOneAndUpdate(
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
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }

  findOneAndUpdate(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">
  ): Promise<IKeys> {
    const {
      userId,
      privateKey,
      refreshTokensUsed: [],
      refreshToken,
    } = params;
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findByIdAndUpdate(
          { userId },
          { privateKey, refreshToken },
          { upsert: true, new: true }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
}

const keyRepository = new KeyRepository();

export { keyRepository };
