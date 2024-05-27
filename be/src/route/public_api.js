import express from "express";
import { prismaClient } from "../application/database.js";
import jagoohomeController from "../controler/jagoohome_controller.js";

const jagoohomePublicRouter = new express.Router();

jagoohomePublicRouter.post('/register', jagoohomeController.register);
jagoohomePublicRouter.post('/login', jagoohomeController.login);
jagoohomePublicRouter.get('/paket', jagoohomeController.paket);

export{
    jagoohomePublicRouter
}