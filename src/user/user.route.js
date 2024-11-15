// user/user.route.js
import express from "express";
import { getUserById } from "./user.controller.js";
// 라우터를 설정

const router = express.Router();

// 이 라우터는 /user 요청이 들어오면 실행
router.get("/", (req, res) => {
  res.send("User main route");
});

// 추가 라우터 사용하기
router.get("/:id", getUserById);

export default router;
