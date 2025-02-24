import { Router } from "express";
// import { ModeratorController } from "./moderator.controller";
import { auth } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const route = Router();

route.put('/:id', auth("admin", "superAdmin"), AdminController.makeAdminController);
route.delete('/:id', auth("admin", "superAdmin"), AdminController.removeAdminController);

export const moderatorRoute = route;