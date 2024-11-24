import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// 라우터 파일 가져오기
import userRoutes from './user/user.route.js';
import calendarRoutes from './calendar/calendar.route.js';
import projectRoutes from './project/project.route.js';

// 오류 처리 미들웨어 가져오기
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import { getUserInfo } from './user/info/user.info.controller.js';
import { getProjectInfo, getSpecificProjectInfo } from './project/project.controller.js';

dotenv.config(); // dotenv 설정

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 라우터 설정

// 지워 users 때문에 이상한거에 접속함

// app.use("/users", userRoutes);/
// app.use("/calendar", calendarRoutes);
// app.use("/projects", projectRoutes);

// jun
app.get("/users/info", getUserInfo);
app.get("/projects/info", getProjectInfo);
app.get("/projects/:projectKey/info", getSpecificProjectInfo); // 프로젝트 1개 상세히 선택

// 404 처리 미들웨어
app.use(notFoundHandler);

// 오류 처리 미들웨어
app.use(errorHandler);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
