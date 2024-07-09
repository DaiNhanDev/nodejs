import { catchError } from "../../../utils/handleError";
import accessController from "../../../controllers/access.controller";
import { Router } from "express";
import requireUser from "../../../middlewares/requiresUser";
const route = Router();

route.post("/shop/signup", catchError(accessController.signup));
route.post("/shop/login", catchError(accessController.login));
route.post("/shop/logout", requireUser, catchError(accessController.logout));
route.post(
  "/shop/refresh-token",
  requireUser,
  catchError(accessController.handleRefresToken),
);

export default route;
