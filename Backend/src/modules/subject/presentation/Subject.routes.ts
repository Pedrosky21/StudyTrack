import { Router } from "express";
import subjectController from "./Subject.controller";
import { checkAuth } from "../../../shared/middlewares/auth.middleware";

const subjectRouter = Router();

subjectRouter.post("/create", checkAuth, subjectController.create);
subjectRouter.put("/edit", checkAuth, subjectController.updateSubject);
subjectRouter.get("/getAll", checkAuth, subjectController.getAll);
subjectRouter.post("/delete/:id", checkAuth, subjectController.deleteSubject);

export default subjectRouter;
