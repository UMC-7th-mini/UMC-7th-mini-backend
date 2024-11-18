import express from "express";
import {
  signUpController,
  signUpDuplicateController,
  signOutController,
} from "./sign.controller.js";

const router = express.Router();

// 회원가입
router.post("/up", signUpController);

// 중복 확인
router.get("/up/duplicate/:id", signUpDuplicateController);

// 로그아웃
router.post("/out/:id", signOutController);

export default router; // Default Export
