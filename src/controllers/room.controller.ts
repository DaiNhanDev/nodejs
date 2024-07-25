import { Request, Response } from "express";
import { CREATED } from "../utils/success.response";
import { IShop } from "types";
import { RoomService } from "../services/room/room.service";

class RoomController {
  createRoom = async (req: Request, res: Response) => {
    const { room_type = "", hostId = "", audienceId = '', room_name = '' } = req.body;
    const metadata = await RoomService.createRoom({
      room_type,
      hostId,
      audienceId: "",
      room_name
    });

    return new CREATED<IShop>({
      metadata,
    }).send(res);
  };
}

export default new RoomController();
