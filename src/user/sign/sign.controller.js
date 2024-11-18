import signService from "./sign.service.js"; // Default Import
import HttpException from "../../middlewares/errorHandler.js";

export const signUpController = async (req, res, next) => {
  try {
    const { userId, userName, userPassword, userEmail, gender, birth } =
      req.body;

    const signUpData = {
      userId,
      userName,
      userPassword,
      userEmail,
      gender,
      birth,
    };
    const result = await signService.signUpService(signUpData);

    if (!result) {
      return next(new HttpException(400, "잘못된 형식의 정보 전송"));
    }

    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const signUpDuplicateController = async (req, res, next) => {
  try {
    const result = await signService.signUpDuplicateService(req.params.id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const signOutController = async (req, res, next) => {
  try {
    const result = await signService.signOutService(req.params.id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
