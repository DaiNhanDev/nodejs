import { Request, Response } from "express";
import { CREATED } from "../utils/success.response";
import { IShop } from "types";
import { AgoraService } from "../services/agora";

class AgoraController {
  generateRtcToken = async (req: Request, res: Response) => {
    const { channelName = "", uid = "", role = 1 } = req.query;
    console.log('=====> req.query', req.query);
    const metadata = await AgoraService.generateRtcToken({
      channelName,
      uid,
      role,
    });
    console.log('====> metadata', metadata);
    return new CREATED<IShop>({
      metadata: {},
    }).send(res);
  };
}

export default new AgoraController();
