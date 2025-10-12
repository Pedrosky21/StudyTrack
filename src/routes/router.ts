import { Router } from "express";
import subjectRouter from "../modules/subject/presentation/Subject.routes";
import topicRouter from "../modules/topic/presentation/Topic.routes";
import unitRouter from "../modules/unit/presentation/Unit.routes";

const router = Router();

router.use("/subjects", subjectRouter);
router.use("units", unitRouter);
router.use("/topics", topicRouter);

export default router;
