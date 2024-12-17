
import express from "express";
import {
  projectMakeController,
  taskMakeController,
} from "./project.controller.js";
import { authenticateToken } from "../user/middlewares/jwt.js";
const router = express.Router();

// 이 라우터는 /project 요청이 들어오면 실행
router.get("/", (req, res) => {
  res.send("project main route");
});

router.use("/info", (req, res) => {
  res.send("Project info route");
});

router.post("/projectMake", authenticateToken, projectMakeController);
router.post("/taskMake", authenticateToken, taskMakeController);

export default router;

