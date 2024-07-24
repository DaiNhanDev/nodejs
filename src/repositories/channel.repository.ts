import { channelModel } from "../models";
import {  IChannel } from "../types";

interface IChannelRepository {
  findById(key: string): Promise<IChannel>;
  create(
    apikey: Omit<IChannel, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IChannel>;
}

class ChannelRepository implements IChannelRepository {
  create(
    apikey: Omit<IChannel, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IChannel> {
    return new Promise((resolve, reject) =>
      channelModel
        .create(apikey)
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
  findById(key: string): Promise<IChannel> {
    return new Promise((resolve, reject) =>
      channelModel
        .findOne({ key, status: true })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error)),
    );
  }
}

const channelRepository = new ChannelRepository();

export { channelRepository };
