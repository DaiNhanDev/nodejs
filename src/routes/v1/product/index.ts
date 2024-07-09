import { catchError } from "../../../utils/handleError";
import productController from "../../../controllers/product.controller";
import { Router } from "express";
import requireUser from "../../../middlewares/requiresUser";
const route = Router();

route.post("/create", requireUser, catchError(productController.create));
route.get(
  "/drafts",
  requireUser,
  catchError(productController.getAllDraftForShop),
);
route.get(
  "/publisheds",
  requireUser,
  catchError(productController.getAllPublishedForShop),
);
route.put(
  "/publish/:id",
  requireUser,
  catchError(productController.publishProductByShop),
);

export default route;
