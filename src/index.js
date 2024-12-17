
import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
//import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
// 라우터 파일 가져오기
import userRoutes from "./user/user.route.js";
// import calendarRouter from './calendar/calendar.route.js';
import projectRoutes from "./project/project.route.js";

// 오류 처리 미들웨어 가져오기
import swaggerUiExpress from "swagger-ui-express";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import { getUserInfo } from "./user/info/user.info.controller.js";
import {
  getFinishProjectInfo,
  getProjectInfo,
  getWorkingProjectInfo,
} from "./project/project.controller.js";
import { getSpecificProjectInfo } from "./project/project.controller.js";
import swaggerFile from "../swagger/swagger-output.json" with { type: "json" };
import swaggerUi from "swagger-ui-express";

dotenv.config(); // dotenv 설정

const app = express();
const port = 3000;

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));

// CORS 설정 - 모든 도메인 허용 (혹은 특정 도메인만 허용하도록 수정 가능)
// app.use(cors({
//   origin: 'http://umc-d.kro.kr', // 특정 도메인만 허용 (예시)
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // 허용할 HTTP 메소드
//   allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
// }));

app.use(cors());

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 라우터 설정

// 지워 users 때문에 이상한거에 접속함

app.use("/users", userRoutes);
// app.use("/calendar", calendarRoutes);
// app.use("/projects", projectRoutes);

app.get("/users/info/:userKey", getUserInfo);
app.get("/projects/allinfo/:userKey", getProjectInfo);
app.get("/projects/info/specify/:userKey/:projectKey", getSpecificProjectInfo); // 프로젝트 1개 상세히 선택
app.get("/projects/info/progress/:userKey", getWorkingProjectInfo); // 프로젝트 진행 중 (못 고침)
app.get("/projects/info/finish/:userKey", getFinishProjectInfo); // 프로젝트 끝

app.get("/projects/info/recent/:userKey", getRecentProjectInfo); // 최근 프로젝트 조회
app.get("/projects/info/least/:userKey", getLeastProjectInfo); // 오래된 프로젝트 조회

// 404 처리 미들웨어
app.use(notFoundHandler);

// 오류 처리 미들웨어
app.use(errorHandler);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
=======
import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
//import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
// 라우터 파일 가져오기
import userRoutes from "./user/user.route.js";
// import calendarRouter from './calendar/calendar.route.js';
import projectRoutes from "./project/project.route.js";

// 오류 처리 미들웨어 가져오기
import swaggerUiExpress from "swagger-ui-express";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import {
  addTaskController,
  deleteTaskController,
  getFinishProjectInfo,
  getLeastProjectInfo,
  getProjectInfo,
  getRecentProjectInfo,
  getWorkingProjectInfo,
  putTaskController,
} from "./project/project.controller.js";
import { getSpecificProjectInfo } from "./project/project.controller.js";
import swaggerFile from "../swagger/swagger-output.json" with { type: "json" };
import swaggerUi from "swagger-ui-express";
import { authenticateToken } from "./user/middlewares/jwt.js";
import { getUserInfo } from "./user/info/user.info.controller.js";

dotenv.config(); // dotenv 설정

const app = express();
const port = 3000;

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile));


// CORS 설정 - 모든 도메인 허용 (혹은 특정 도메인만 허용하도록 수정 가능)
// app.use(cors({
//   origin: 'http://umc-d.kro.kr', // 특정 도메인만 허용 (예시)
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // 허용할 HTTP 메소드
//   allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
// }));

app.use(cors());


// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 라우터 설정

// 지워 users 때문에 이상한거에 접속함

app.use("/users", userRoutes);
// app.use("/calendar", calendarRoutes);
// app.use("/projects", projectRoutes);

app.get("/users/info", authenticateToken, getUserInfo);
app.get("/projects/info/all", authenticateToken, getProjectInfo);
app.get("/projects/info/specify/:projectKey", authenticateToken, getSpecificProjectInfo); // 프로젝트 1개 상세히 선택
app.get("/projects/info/progress", authenticateToken, getWorkingProjectInfo); // 프로젝트 진행 중 (못 고침)
app.get("/projects/info/finish", authenticateToken, getFinishProjectInfo); // 프로젝트 끝


app.get("/projects/info/recent", authenticateToken, getRecentProjectInfo); // 최근 프로젝트 조회
app.get("/projects/info/least", authenticateToken, getLeastProjectInfo); // 오래된 프로젝트 조회


app.post("/projects/tasks", authenticateToken, addTaskController);
app.put("/projects/tasks/fix/:taskKey", authenticateToken, putTaskController);
app.delete("/projects/tasks/:taskKey", authenticateToken, deleteTaskController);

// 404 처리 미들웨어
app.use(notFoundHandler);

// 오류 처리 미들웨어
app.use(errorHandler);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}
