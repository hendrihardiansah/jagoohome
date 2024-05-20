import express from "express";
import jagoohomeController from "../controler/jagoohome_controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.post('/user/order', jagoohomeController.create);

export{
    userRouter
}