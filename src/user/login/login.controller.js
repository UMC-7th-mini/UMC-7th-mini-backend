import { loginService, logoutService } from "./login.service.js";
import HttpException from "../../middlewares/errorHandler.js";

const loginController = async (req, res, next) => {
  try {
    const loginData = req.body; // id, password
    const tokenInfo = await loginService(loginData);
    if (!tokenInfo) {
      return next(new HttpException(400, "잘못된 형식의 정보 전송"));
    }
    res.status(200).json({ success: true, data: tokenInfo });
  } catch (error) {
    console.error(error.message);
  }
};

// 로그아웃 컨트롤러
const logoutController = async (req, res, next) => {
  try {
    const logoutData = req.body;// userId
    const logoutResult = await logoutService(logoutData);
    if (!logoutResult) {
      return next(new HttpException(400, "잘못된 형식의 정보 전송"));
    }
    res.status(200).json({ success: true, message: logoutResult });
  } catch (error) {
    console.error(error.message);
  }
};

export { loginController, logoutController };
