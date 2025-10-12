import { Router } from "express";
import subjectController from "./Subject.controller";
import { checkAuth } from "../../../shared/middlewares/auth.middleware";

const subjectRouter = Router();

subjectRouter.post("/create", checkAuth, subjectController.createSubject);
subjectRouter.put("/edit/:id", checkAuth, subjectController.updateSubject);
subjectRouter.get("/getAll", checkAuth, subjectController.getAllSubjects);
subjectRouter.delete("/delete/:id", checkAuth, subjectController.deleteSubject);
subjectRouter.get("/topicsCompleted/:id", subjectController.countCompletedTopics);
subjectRouter.get("/:id", checkAuth, subjectController.getSubjectByID);

export default subjectRouter;
