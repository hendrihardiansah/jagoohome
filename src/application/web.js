import express from "express";
import { jagoohomePublicRouter } from "../route/public_api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express ();
web.use(express.json());

web.use(jagoohomePublicRouter);
web.use(errorMiddleware);