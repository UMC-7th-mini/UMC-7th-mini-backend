import HttpException from "../../middlewares/errorHandler.js";
import { getUserInfoService } from "./user.info.service.js";


export const getUserInfo = async (req, res, next) => { 
/* #swagger.tags = ['userinfo']
  #swagger.summary = 'Userget info'
  #swagger.description = 'userinfo get'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get user info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }
  #swagger.responses[200] = {
  description: 'User info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/User" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
  
    try {
        const {userKey} = req.params; // 쿼리에서 userKey 가져오기
        console.log(userKey);
        
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