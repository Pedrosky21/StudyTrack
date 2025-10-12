import { Router } from "express";
import topicController from "./Topic.controller";
import { checkAuth } from "../../../shared/middlewares/auth.middleware";

const topicRouter = Router();
topicRouter.post("/create", topicController.createTopic);
topicRouter.put("/edit/:id", checkAuth, topicController.toggleTopicProgress);
topicRouter.post("/finish/:id", checkAuth, topicController.toggleTopicProgress);
topicRouter.post("/delete/:id", topicController.deleteTopic);

export default topicRouter;
