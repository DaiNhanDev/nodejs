import { BadRequestError } from "../../utils/error.response";
import {
  updateItem,
  get,
  createItem,
  query,
  ref,
  database,
  equalTo,
} from "../../firebase";
import { roomRepository } from "../../repositories/room.repository";
export class RoomService {
  user_ids;
  room_name;
  room_type: string;
  room_id;

  constructor({ user_ids, room_name, room_type, room_id }) {
    this.user_ids = user_ids;
    this.room_id = room_id;
    this.room_name = room_name;
    this.room_type = room_type;
  }

  static async createRoom({
    hostId,
    audienceId,
    room_type = "livestream",
    room_name = "room_name",
  }) {
    const snapshot = await createItem(`/rooms`, {
      room_type,
    });
    const roomId = snapshot.key;

    const newRoom = await roomRepository.create({
      room_id: roomId,
      room_name: room_name,
      room_type: "livestream",
    });
    return newRoom;
  }

  // static async joinLiveStream({ userID, room_id }) {
  //   const queryRoom = query(ref(database, `chat/${room_id}`), equalTo(userID));

  // }

  static async calling({
    hostId,
    audienceId,
    room_type = "chatter",
    room_name = "room_name",
    room_id,
  }) {
    if (!room_id) {
      const snapshot = await createItem(`/rooms`, {
        room_type,
      });
      const roomId = snapshot.key;

      Promise.all([
        updateItem(`/rooms/${roomId}/${hostId}`, true),
        updateItem(`/rooms/${roomId}/${audienceId}`, true),
      ]);
      await roomRepository.create({
        room_id: roomId,
        room_name: room_name,
        room_type: "chatter",
        user_ids: [hostId, audienceId],
      });

      await updateItem(`/users/${hostId}/host`, {
        status: 'calling',
        room_id: roomId
      });
      await updateItem(`/users/${audienceId}/audience`, {
        caller: hostId,
        status: 'calling',
        room_id: roomId
      });
    } else {
      Promise.all([
        updateItem(`/rooms/${room_id}/${hostId}`, true),
        updateItem(`/rooms/${room_id}/${audienceId}`, true),
      ]);
      await roomRepository.create({
        room_id: room_id,
        room_name: room_name,
        room_type: "chatter",
        user_ids: [hostId, audienceId],
      });

      await updateItem(`/users/${hostId}/host`, {
        status: 'calling',
        room_id: room_id
      });
      
      await updateItem(`/users/${audienceId}/audience`, {
        caller: hostId,
        status: 'calling',
        room_id: room_id
      });
    }
  }
}
