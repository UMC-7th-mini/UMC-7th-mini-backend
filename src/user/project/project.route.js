import express from "express";
import { projectMake } from "./project.controller.js";

const router = express.Router();

// 프로젝트 생성 라우트
router.post("/make", projectMake);

export default router;
