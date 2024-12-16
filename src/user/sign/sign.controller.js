import signService from "./sign.service.js"; // Default Import
import HttpException from "../../middlewares/errorHandler.js";

export const signUpController = async (req, res, next) => {
  /* #swagger.tags = ['signUp']
  #swagger.summary = ' signup'
  #swagger.description = 'signup'
  #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignUser" },
        },
      }
    }

  #swagger.responses[200] = {
  description: 'signup 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SignUser" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */

  try {
    const signUpData = req.body;
    const result = await signService.signUpService(signUpData);
    if (!result) {
      return next(new HttpException(400, "잘못된 형식의 정보 전송"));
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error.message);
  }
};

export const signUpDuplicateController = async (req, res) => {
  try {
    const result = await signService.signUpDuplicateService(req.params.id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error.message);
  }
};

export const signOutController = async (req, res) => {
  try {
    const result = await signService.signOutService(req.params.id);

    // "notFoundId" 상태 처리
    if (result === "notFoundId") {
      return res.status(400).json({ fail: true, data: result });
    }

    // 삭제 성공 상태 처리
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error.message);
    // 서버 에러 (500)
    return res
      .status(500)
      .json({ fail: true, message: "Internal server error" });
  }
};
