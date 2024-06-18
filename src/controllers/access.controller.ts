import { NextFunction, Request, Response } from "express";
import { AccessService } from "../services/access.service";

class AccessController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    console.log("=====> Body: ");
    const { email = '', password = '', name = '' } = req.body;
    const data = await AccessService.signUp({
      email,
      password,
      name,
    });
    console.log("====> data", data);
    try {
      return res.status(201).json({
        code: "201",
        metadata: { user_id: 1 },
      });
    } catch (error) {
      console.log("====> error", error);
      next(error);
    }
  };
}

export default new AccessController();
