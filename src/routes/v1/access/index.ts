import accessController from "../../../controllers/access.controller";
import { Router } from "express";
// import { validateRequest } from "../../middlewares";
// import {
//   // forgotPassword,
//   loginUser,
//   registerUser,
//   // resetPassword,
// } from "../../controllers/auth";
// import { loginSchema, registerSchema } from "../../validation/user";
const route = Router();

route.get("/shop", (req, res) => {
   return res.json({
    msg: 'ssss'
  })
});
// route.post("/login", validateRequest(loginSchema), loginUser);
// route.post("/forgot-password", forgotPassword);
// route.post("/reset-password", resetPassword);

export default route;
