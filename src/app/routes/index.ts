import { Router } from "express";
import { userRoute } from "../modules/auth/auth.routes";
// import path from "path";
import { adminRoute } from "../modules/admin/admin.routes";
import { postRouter } from "../modules/post/post.routes";
import { moderatorRoute } from "../modules/moderator/moderator.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: userRoute
    },
    {
        path: "/admin",
        route: adminRoute
    },
    {
        path: "/posts",
        route: postRouter
    },
    {
        path: "/moderator",
        route: moderatorRoute,
    }
]

moduleRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;