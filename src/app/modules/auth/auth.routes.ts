import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./auth.controllers";
import {
  userLoginValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { uploadAndCompress } from "../../utils/fileUpload";
// import { upload } from "../../utils/fileUpload";

const route = Router();

// route.post(
//   "/",
//   // upload.single("file"),
//   uploadAndCompress,
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(userValidationSchema),
//   UserController.createUserController,
// );



route.post('/signup', validateRequest(userValidationSchema), UserController.signupUserController);

route.post('/login', validateRequest(userLoginValidationSchema), UserController.loginUserController);


route.get("/", UserController.getUserController);
route.get("/:email", UserController.getUserByEmailController);
route.put(
  "/:id",
  uploadAndCompress,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userUpdateValidationSchema),
  UserController.updateUserController,
);
route.delete("/:id", UserController.deleteUserController);
route.get("/id/:id", UserController.getUserByIdController);

export const userRoute = route;
