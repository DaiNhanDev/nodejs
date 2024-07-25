import { Router } from "express";
import accessRoute from "./v1/access";
import productRoute from "./v1/product";
import agoraRoute from "./v1/agora";
import roomRoute from "./v1/room";

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
  {
    path: "/agora",
    router: agoraRoute,
  },
  {
    path: "/room",
    router: roomRoute,
  },
];
// appRouter.use(apiKey);
// appRouter.use(checkPermission("0000"));

appRoutesV1.forEach(({ path, router }) => {
  appRouter.use(path, router);
});

export default appRouter;
