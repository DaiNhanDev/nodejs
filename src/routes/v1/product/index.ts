import { catchError } from "../../../utils/handleError";
import productController from "../../../controllers/product.controller";
import { Router } from "express";
import requireUser from "../../../middlewares/requiresUser";
const route = Router();

route.get(
  "/draft/all",
  requireUser,
  catchError(productController.getAllDraftForShop),
);
route.get(
  "/published/all",
  requireUser,
  catchError(productController.getAllPublishedForShop),
);
route.put(
  "/publish/:id",
  requireUser,
  catchError(productController.publishProductByShop),
);

route.put(
  "/unpublish/:id",
  requireUser,
  catchError(productController.unPublishProductByShop),
);

route.get("/search", catchError(productController.searchProductByUser));
route.get("/:product_id", catchError(productController.getProductById));
route.patch(
  "/:product_id",
  requireUser,
  catchError(productController.updateProductById),
);
route.get("/", catchError(productController.findProducts));
route.post("/", requireUser, catchError(productController.create));

export default route;
