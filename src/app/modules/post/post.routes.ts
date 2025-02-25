import { Router } from "express";
import { PostController } from "./post.controller";
import { auth } from "../../middlewares/auth";

const router = Router();


router.post('/create', auth("moderator", "superAdmin"), PostController.createPostController);
router.get('/get', PostController.getAllPostsController);
router.get('/get/:id', PostController.getPostByIdController);
router.put('/update/:id', auth("moderator", "superAdmin"), PostController.updatePostController);
router.delete('/delete/:id',auth("moderator", "superAdmin"), PostController.deletePostController);

export const postRouter = router