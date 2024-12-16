import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/jwt.js";
import {
  addToken,
  loginRepository,
  logoutRepository,
} from "./login.repository.js";

// 로그인
const loginService = async userData => {
  try {
    const { userId, userPassword } = userData;

    const userInfo = await loginRepository(userId);

    if (!userInfo) {
      throw new Error("Invalid Id or password");
    }
    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(
      userPassword,
      userInfo.userPassword
    );
    if (!isPasswordValid) {
      throw new Error("Invalid Id or password");
    }

    const token = generateToken({ key: userInfo.userKey, id: userInfo.userId });
    const add = addToken(userId, token);
    const tokenInfo = { userId, token };

    return tokenInfo;
  } catch (error) {
    console.error(`Error login: ${error.message}`);
  }
};
// 로그아웃
const logoutService = async userId => {
  const userId = await logoutRepository(userId);
  if (!userId) {
    throw new Error("Invalid Id");
  }
  return { message: "User logged out successfully" };
};

export { loginService, logoutService };
