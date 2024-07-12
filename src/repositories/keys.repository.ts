import { keyTokenModel } from "../models";

import { IKeys } from "../types";

interface IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IKeys>;
  findOneAndUpdate(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IKeys>;
  findUserById(userId): Promise<IKeys>;
  removeKeyById(id): Promise<IKeys>;
  findByRefreshTokenUsed(refreshToken): Promise<IKeys>;
  findByRefreshToken(refreshToken): Promise<IKeys>;
  updateToken(params): Promise<IKeys>;
}

class KeyRepository implements IKeyRepository {
  createKeyToken(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findOneAndUpdate(
    params: Omit<IKeys, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IKeys> {
    const { userId, privateKey, refreshTokensUsed, refreshToken, publicKey } =
      params;
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findByIdAndUpdate(
          userId,
          { privateKey, refreshToken, publicKey, refreshTokensUsed, userId },
          { upsert: true, new: true },
        )
        .lean()
        .then((data) => {
          console.log({ data });
          return resolve(data);
        })
        .catch((error) => reject(error)),
    );
  }

  findUserById(userId): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findOne({ userId })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
  removeKeyById(id): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findByIdAndDelete(id)
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findByRefreshTokenUsed(refreshToken): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findOne({ refreshTokensUsed: refreshToken })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  findByRefreshToken(refreshToken): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findOne({ refreshToken })
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }

  updateToken({ refreshToken, refreshTokensUsed }): Promise<IKeys> {
    return new Promise((resolve, reject) =>
      keyTokenModel
        .findOneAndUpdate(
          { refreshToken },
          {
            $set: {
              refreshToken,
            },
            $addToSet: {
              refreshTokensUsed,
            },
          },
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const keyRepository = new KeyRepository();

export { keyRepository };
