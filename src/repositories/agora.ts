import { agoraModel } from "../models";
import {  IAgora } from "../types";

interface IAgoraRepository {
  findById(key: string): Promise<IAgora>;
  create(
    apikey: Omit<IAgora, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IAgora>;
}

class AgoraRepository implements IAgoraRepository {
  create(
    apikey: Omit<IAgora, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IAgora> {
    return new Promise((resolve, reject) =>
      agoraModel
        .create(apikey)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
  findById(key: string): Promise<IAgora> {
    return new Promise((resolve, reject) =>
      agoraModel
        .findOne({ key, status: true })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const agoraRepository = new AgoraRepository();

export { agoraRepository };
