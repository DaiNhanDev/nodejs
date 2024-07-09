import { Router } from "express";
import accessRoute from "./v1/access";
import productRoute from "./v1/product";

// import { apiKey, checkPermission } from "../middlewares/checkApiKey";

const appRouter = Router();

// all routes
const appRoutesV1 = [
  {
    path: "/access",
    router: accessRoute,
  },
  {
    path: "/product",
    router: productRoute,
  },
];
// appRouter.use(apiKey);
// appRouter.use(checkPermission("0000"));

appRoutesV1.forEach(({ path, router }) => {
  appRouter.use(path, router);
});

export default appRouter;
