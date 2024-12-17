import { loginService, logoutService } from "./login.service.js";
import HttpException from "../../middlewares/errorHandler.js";

const loginController = async (req, res, next) => {
    /* 
    #swagger.security = [{
            "bearerAuth": []
    }]       
    #swagger.tags = ['login']
     #swagger.summary = 'login'
     #swagger.description = 'login'
     #swagger.consumes = ['application/json'] 
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId : { type: "string" },
                userPassword : { type: "string" }
              },
              required: ["userId", "userPassword"]
            }
          }
        }
     }
     #swagger.responses[200] = {
        description: 'login successfully',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/login" }
          }
        }
     }
  */
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
  /* 
    #swagger.security = [{
            "bearerAuth": []
    }]       
    #swagger.tags = ['loginOut']
     #swagger.summary = 'loginOut'
     #swagger.description = 'loginOut'
     #swagger.consumes = ['application/json'] 
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId : { type: "string" }
              },
              required: ["userId"]
            }
          }
        }
     }
     #swagger.responses[200] = {
        description: 'login Out successfully',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/loginOut" }
          }
        }
     }
  */

  try {
    const logoutData = req.body; // userId
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
