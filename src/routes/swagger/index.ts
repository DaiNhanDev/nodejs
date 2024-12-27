import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";
import { swaggerUserOption } from "../../configs/swagger.config";
const swaggerSpec = swaggerJSDocs(swaggerUserOption);
const docsRouter = Router();

docsRouter.use("/", swaggerUi.serve);
docsRouter.get("/", swaggerUi.setup(swaggerSpec));

docsRouter.use("/shop", swaggerUi.serve);
docsRouter.get("/shop", swaggerUi.setup(swaggerSpec));

export default docsRouter;
