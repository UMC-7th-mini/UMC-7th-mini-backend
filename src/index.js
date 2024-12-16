import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// 라우터 파일 가져오기
import userRoutes from './user/user.route.js';
// import calendarRouter from './calendar/calendar.route.js';
import projectRoutes from './project/project.route.js';

// 오류 처리 미들웨어 가져오기
import swaggerUiExpress from "swagger-ui-express";
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import { getUserInfo } from './user/info/user.info.controller.js';
import { getFinishProjectInfo, getProjectInfo, getWorkingProjectInfo } from './project/project.controller.js';
import { getSpecificProjectInfo } from './project/project.controller.js';
import swaggerFile from '../swagger/swagger-output.json' with { type: 'json' };
import swaggerUi from 'swagger-ui-express';

dotenv.config(); // dotenv 설정

const app = express();
const port = 3000;

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerFile)
);

// CORS 설정 - 모든 도메인 허용 (혹은 특정 도메인만 허용하도록 수정 가능)
app.use(cors({
  origin: 'http://umc-d.kro.kr', // 특정 도메인만 허용 (예시)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // 허용할 HTTP 메소드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
}));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));



app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 라우터 설정

// 지워 users 때문에 이상한거에 접속함

// app.use("/users", userRoutes);/
// app.use("/calendar", calendarRoutes);
// app.use("/projects", projectRoutes);

// jun
app.post("/users/info", getUserInfo);
app.post("/projects/info", getProjectInfo);
app.post("/projects/:projectKey/info", getSpecificProjectInfo); // 프로젝트 1개 상세히 선택
app.post("/projects/info/progress", getWorkingProjectInfo); // 프로젝트 진행 중
app.post("/projects/info/finish", getFinishProjectInfo); // 프로젝트 끝


// app.get("/projects/info/recent", getRecentProjectInfo);
// app.get("/projects/info/least", getLeastProjectInfo);



// 이예지
// app.post("/projects/:projectKey/member");
// app.delect("/projects/:projectKey/member");
// app.put("/projects/:projectKey/task/:taskKey");
// app.post("/projects/:projectKey/:userKey/task");
// app.delect("/projects/:projectKey/task/:taskKey");
// Extra
// app.get()

// 404 처리 미들웨어
app.use(notFoundHandler);

// 오류 처리 미들웨어
app.use(errorHandler);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
