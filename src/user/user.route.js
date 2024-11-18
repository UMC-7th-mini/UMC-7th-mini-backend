import express from "express";
import signRouter from "./sign/sign.route.js"; // Default Import
import projectRouter from "./project/project.route.js"
import logRouter from "./log/log.route.js"
const router = express.Router();

// 이 라우터는 /user 요청이 들어오면 실행
router.get("/", (req, res) => {
  res.send("User main route");
});

// /user/sign 경로 설정
router.use("/sign", signRouter);
router.use("/project", projectRouter)
router.use("/log", logRouter)
export default router;
