import { Request, Response } from "express";
import { AccessService } from "../services/access.service";
import { CREATED } from "../utils/success.response";
import { IShop } from "types";

class AccessController {
  signup = async (req: Request, res: Response) => {
    const { email = "", password = "", name = "" } = req.body;
    const metadata = await AccessService.signUp({
      email,
      password,
      name,
    });
    return new CREATED<IShop>({
      metadata,
    }).send(res);
  };
}

export default new AccessController();
