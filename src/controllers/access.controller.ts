import { Request, Response } from "express";
import { AccessService } from "../services/access.service";
import { CREATED, SuccessResponse } from "../utils/success.response";
import { IShop } from "types";
import { CustomRequest } from "types/customDefinition";

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

  login = async (req: Request, res: Response) => {
    const { email = "", password = "" } = req.body;
    const metadata = await AccessService.login({
      email,
      password,
    });
    return new SuccessResponse<IShop>({
      metadata,
    }).send(res);
  };

  logout = async (req: CustomRequest, res: Response) => {
    const metadata = await AccessService.logout(req.keyStore._id);
    return new SuccessResponse<IShop>({
      metadata,
      message: "Logout Success",
    }).send(res);
  };

  handleRefresToken = async (req: CustomRequest, res: Response) => {
    console.log('=======> refreshToken', req.body.refreshToken);
    const metadata = await AccessService.handleRefreshToken(req.body.refreshToken);
    return new SuccessResponse<IShop>({
      metadata,
      message: "Logout Success",
    }).send(res);
  };
}

export default new AccessController();
