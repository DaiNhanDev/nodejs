import { Router } from "express";
import accessRoute from './v1/access';

const appRouter = Router();

// all routes
const appRoutesV1 = [
    //   {
    //     path: "/docs",
    //     router: docsRouter,
    //   },
      {
        path: "/access",
        router: accessRoute,
      },
];

appRoutesV1.forEach(route => {
    appRouter.use(`/v1/${route.path}`, route.router);
});

export default appRouter;
