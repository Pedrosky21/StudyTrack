import { Router } from "express";
import authController from "./Auth.controller";
import { checkAuth } from "../../../shared/middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", checkAuth, authController.register);
authRouter.post("/login", checkAuth, authController.login);

export default authRouter;
