import { roomModel } from "../models";
import { IRoom } from "../types";

interface IRoomRepository {
  findByUserId(key: string): Promise<IRoom>;
  create(room: Omit<IRoom, "_id" | "createdAt" | "updatedAt">): Promise<IRoom>;
}

class RoomRepository implements IRoomRepository {
  create(room: Omit<IRoom, "_id" | "createdAt" | "updatedAt">): Promise<IRoom> {
    console.log('=======>room ', room);
    return new Promise((resolve, reject) =>
      roomModel
        .create(room)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
  findByUserId(key: string): Promise<IRoom> {
    return new Promise((resolve, reject) =>
      roomModel
        .findOne({ key, status: true })
        .lean()
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    );
  }
}

const roomRepository = new RoomRepository();

export { roomRepository };
