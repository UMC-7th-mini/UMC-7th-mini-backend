import logService from "./log.service.js"; // logService 객체 임포트
import HttpException from "../../middlewares/errorHandler.js";

// 로그인 함수
export const signUp = async (req, res, next) => {
  try {
    // logService의 login 메서드 호출
    const loginResult = await logService.login();

    // 성공 응답 반환
    return res.status(200).json({ success: true, data: loginResult });
  } catch (error) {
    // 에러를 미들웨어로 전달
    next(error);
  }
};

// 로그아웃 함수
export const logOut = async (req, res, next) => {
  try {
    // req.params에서 사용자 ID 가져오기
    const { id } = req.params;

    // logService의 logOut 메서드 호출
    const logoutResult = await logService.logout(id);

    // 성공 응답 반환
    return res.status(200).json({ success: true, data: logoutResult });
  } catch (error) {
    // 에러를 미들웨어로 전달
    next(error);
  }
};
