import { NextFunction, Request, Response } from "express";
import { AccessService } from "../services/access.service";

class AccessController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email = "", password = "", name = "" } = req.body;
    const data = await AccessService.signUp({
      email,
      password,
      name,
    });
    try {
      return res.status(201).json(data);
    } catch (error) {
      console.log("====> error", error);
      next(error);
    }
  };
}

export default new AccessController();
