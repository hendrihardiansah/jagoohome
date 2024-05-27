import express from "express";
import jagoohomeController from "../controler/jagoohome_controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const jagoohomeUserRouter = new express.Router();
jagoohomeUserRouter.use(authMiddleware);
jagoohomeUserRouter.post('/user/order', jagoohomeController.order);
jagoohomeUserRouter.get('/user/get/order', jagoohomeController.orderan);
jagoohomeUserRouter.post('/user/order/update', jagoohomeController.updateorder);
jagoohomeUserRouter.post('/admin/order/update', jagoohomeController.updatestatus);
jagoohomeUserRouter.get('/user/teknisi', jagoohomeController.teknisi);
jagoohomeUserRouter.post('/user/logout', jagoohomeController.logout);

export{
    jagoohomeUserRouter
}