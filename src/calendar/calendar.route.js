import express from "express";

const router = express.Router();

// 이 라우터는 /calendar 요청이 들어오면 실행
router.get("/", (req, res) => {
  res.send("calendar main route");
});

// 추가 라우터 사용하기
router.use("/info", (req, res) => {
  // /calendar/info - 똑같은 형식으로 사용
  res.send("calendar info route");
});

export default router;
