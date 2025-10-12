import { Router } from "express";
import unitController from "./Unit.controller";

const unitRouter = Router();

unitRouter.post("/create", unitController.createUnit);
unitRouter.put("/edit", unitController.editUnit);
unitRouter.post("/delete/:id", unitController.deleteUnit);

export default unitRouter;
