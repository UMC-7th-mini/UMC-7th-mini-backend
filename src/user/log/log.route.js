import express from "express";
import { signUp, logOut } from "./log.controller.js";

const router = express.Router();

// 로그인 경로
router.get("/in", signUp);

// 로그아웃 경로
router.get("/out/:id", logOut);

export default router;
