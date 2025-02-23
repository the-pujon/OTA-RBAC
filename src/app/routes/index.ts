import { Router } from "express";
import { userRoute } from "../modules/auth/auth.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoute
    }
]

moduleRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;