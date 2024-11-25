import HttpException from "../../middlewares/errorHandler.js";
import { getUserInfoService } from "./user.info.service.js";


export const getUserInfo = async (req, res, next) => { 
     /**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: "회원 가입 API"
 *     description: "새로운 사용자를 등록합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "사용자의 이메일 주소"
 *               name:
 *                 type: string
 *                 description: "사용자의 이름"
 *               gender:
 *                 type: string
 *                 description: "사용자의 성별"
 *               birth:
 *                 type: string
 *                 format: date
 *                 description: "사용자의 생년월일"
 *               address:
 *                 type: string
 *                 description: "사용자의 주소"
 *               detailAddress:
 *                 type: string
 *                 description: "상세 주소"
 *               phoneNumber:
 *                 type: string
 *                 description: "전화번호"
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: "사용자의 선호 카테고리"
 *     responses:
 *       200:
 *         description: "회원 가입 성공 응답"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "SUCCESS"
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     preferCategory:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: "회원 가입 실패 응답"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: "FAIL"
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: "U001"
 *                     reason:
 *                       type: string
 *                     data:
 *                       type: object
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
    try {
        const userKey = req.body.userKey; // 쿼리에서 userKey 가져오기

        // userKey를 정수형으로 변환
        const parsedUserKey = parseInt(userKey, 10);
        if (isNaN(parsedUserKey)) {
            return res.status(400).json({ success: false, message: "Invalid userKey" });
        }

        const user = await getUserInfoService(parsedUserKey); // 변환된 userKey로 사용자 정보 조회

        if (!user) {
            return next(new HttpException(404, "User not found")); // 사용자 미발견시 에러 처리
        }

        return res.status(200).json({ success: true, data: user }); // 성공 응답

    } catch (error) {
        next(error); // 에러 처리
    }
};