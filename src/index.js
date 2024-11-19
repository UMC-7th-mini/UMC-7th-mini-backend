import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// 라우터 파일 가져오기
import userRoutes from './user/user.route.js';

// 오류 처리 미들웨어 가져오기
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';
import { getUserInfo } from './user/info/user.info.controller.js';
import { getProjectInfo } from './project/project.controller.js';

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

// 라우터 설정

// 지워 users 때문에 이상한거에 접속함

// app.use("/users", userRoutes);/
// app.use("/calendar", calendarRoutes);
// app.use("/projects", projectRoutes);

// jun
app.get("/users/info", getUserInfo);
// app.get("/projects/info", getProjectInfo);

// 404 처리 미들웨어
app.use(notFoundHandler);

// 오류 처리 미들웨어
app.use(errorHandler);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
