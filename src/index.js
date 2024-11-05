import express from "express";

const app = express();
const port = 3000;

// 미들웨어 설정 (예: JSON 요청을 처리)
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
