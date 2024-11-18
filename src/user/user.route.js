import express from "express";
import signRouter from "./sign/sign.route.js";

const router = express.Router();

// 이 라우터는 /user 요청이 들어오면 실행
router.get("/", (req, res) => {
  res.send("User main route");
});

// /user/sign 경로 설정
router.use("/sign", signRouter);

export default router;
