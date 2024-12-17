import HttpException from "../../middlewares/errorHandler.js";
import { getUserInfoService } from "./user.info.service.js";


export const getUserInfo = async (req, res, next) => { 
/* 
  #swagger.security = [{
    "bearerAuth": [] 
  }] 
  #swagger.tags = ['userinfo']
  #swagger.summary = 'User get info'
  #swagger.description = 'Get user information'

  
  #swagger.responses[200] = {
    description: 'User info retrieval successful',
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/User" }, 
      }
    }
  }

  #swagger.responses[400] = {
    description: 'Invalid request format'
  }

  #swagger.responses[401] = {
    description: 'Unauthorized - Access token missing or invalid'
  }
*/
  
    try {
        const { key, id } = req.user; // 쿼리에서 userKey 가져오기
        
        console.log(key);
        
        let userKey = key;
        // userKey를 정수형으로 변환
        if (!(userKey)) {
          return res.status(400).json({ success: false, message: "Invalid userKey" });
        }

        const user = await getUserInfoService(userKey); // 변환된 userKey로 사용자 정보 조회

        if (!user) {
            return next(new HttpException(404, "User not found")); // 사용자 미발견시 에러 처리
        }

        return res.status(200).json({ success: true, data: user }); // 성공 응답

    } catch (error) {
      console.log(error);
        next(error); // 에러 처리
    }
};