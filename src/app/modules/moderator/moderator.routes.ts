import { Router } from "express";
import { ModeratorController } from "./moderator.controller";
import { auth } from "../../middlewares/auth";

const route = Router();

route.put('/:id', auth("admin", "superAdmin"), ModeratorController.makeModeratorController);
route.delete('/:id', auth("admin", "superAdmin"), ModeratorController.removeModeratorController);
route.get('/',auth("admin", "superAdmin"), ModeratorController.getModeratorController)

export const moderatorRoute = route;