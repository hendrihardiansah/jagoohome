import express from "express";
import { prismaClient } from "../application/database.js";
import jagoohomeController from "../controler/jagoohome_controller.js";

const jagoohomePublicRouter = new express.Router();

jagoohomePublicRouter.post('/register', jagoohomeController.register);
jagoohomePublicRouter.post('/login', jagoohomeController.login);
jagoohomePublicRouter.get('/paket', jagoohomeController.paket);

// jagoohomePublicRouter.get('/paket', async (req, res) => {
//     const paket = await prismaClient.paket.findMany();
//     console.log(paket);
//     res.json(paket);
// });

export{
    jagoohomePublicRouter
}