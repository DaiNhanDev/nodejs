import { catchError } from "../../../utils/handleError";
import agoraController from "../../../controllers/agora.controller";
import { Router } from "express";
import requireUser from "../../../middlewares/requiresUser";
const route = Router();

route.get("/token", requireUser, catchError(agoraController.generateRtcToken));

export default route;
