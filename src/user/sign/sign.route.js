import express from "express";
import {
  signUpController,
  signUpDuplicateController,
  signOutController,
} from "./sign.controller.js";
import { authenticateToken } from "../middlewares/jwt.js";

const router = express.Router();

// 회원가입
router.post("/up", signUpController);

// 중복 확인
router.get("/up/duplicate/:id", signUpDuplicateController);

// 회원탈퇴
router.post("/out/:id", authenticateToken, signOutController);

export default router;
