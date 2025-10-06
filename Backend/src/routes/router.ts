import { Router } from "express";
import authRouter from "../modules/auth/presentation/Auth.routes";
import subjectRouter from "../modules/subject/presentation/Subject.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/subjects", subjectRouter);

export default router;