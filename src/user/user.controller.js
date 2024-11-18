import userService from "./user.service.js";
import HttpException from "../middlewares/errorHandler.js";
import { validateUserInput, validateUserOutput } from "./dtos/user.dto.js";

export const getUserById = async (req, res, next) => {
  try {
    // 입력 유효성 검사
    validateUserInput({ id: req.params.id });

    // 서비스 호출
    const user = await userService.getUserById(req.params.id);

    // 사용자 데이터를 찾지 못한 경우
    if (!user) {
      return next(new HttpException(404, "No user found with the provided ID"));
    }

    // 반환 유효성 검사
    validateUserOutput(user);

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error); // 중앙 오류 처리기로 전달
  }
};
