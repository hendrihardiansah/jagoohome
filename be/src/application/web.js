import express from "express";
import { jagoohomePublicRouter } from "../route/public_api.js";
import { jagoohomeUserRouter } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import corsMiddleware from "../middleware/cors-middleware.js";

export const web = express ();
corsMiddleware(web);
web.use(express.json());
web.use(jagoohomePublicRouter);
web.use(jagoohomeUserRouter);
web.use(errorMiddleware);