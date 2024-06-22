import { catchError } from "../../../utils/handleError";
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

route.post("/shop/signup", catchError(accessController.signup));

// route.post("/login", validateRequest(loginSchema), loginUser);
// route.post("/forgot-password", forgotPassword);
// route.post("/reset-password", resetPassword);

export default route;
