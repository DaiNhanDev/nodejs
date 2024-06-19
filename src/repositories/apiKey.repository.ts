import { apiKeyModel } from "../models";
import { IApiKeys } from "../types";

interface IApiKeyRepository {
  findById(key: string): Promise<IApiKeys>;
  create(
    apikey: Omit<IApiKeys, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IApiKeys>;
}

class ApiKeyRepository implements IApiKeyRepository {
  create(
    apikey: Omit<IApiKeys, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IApiKeys> {
    return new Promise((resolve, reject) =>
      apiKeyModel
        .create(apikey)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
  findById(key: string): Promise<IApiKeys> {
    return new Promise((resolve, reject) =>
      apiKeyModel
        .findOne({ key, status: true })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const apiKeyRepository = new ApiKeyRepository();

export { apiKeyRepository };
