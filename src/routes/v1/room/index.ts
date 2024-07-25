import { catchError } from "../../../utils/handleError";
import roomController from "../../../controllers/room.controller";
import { Router } from "express";
// import requireUser from "../../../middlewares/requiresUser";
const route = Router();

route.post("/create", catchError(roomController.createRoom));

export default route;
