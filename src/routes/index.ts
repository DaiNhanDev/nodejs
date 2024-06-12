import { Router } from "express";
import accessRoute from "./v1/access";

const appRouter = Router();
const getV1Path = (path) => `/v1${path}`

// all routes
const appRoutesV1 = [
  {
    path: getV1Path('/access'),
    router: accessRoute,
  },
];

appRoutesV1.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
