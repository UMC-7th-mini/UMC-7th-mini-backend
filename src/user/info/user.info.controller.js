import HttpException from "../../middlewares/errorHandler.js";
import { getUserInfoService } from "./user.info.service.js";



export const getUserInfo = async (req, res, next) => { 
    /**
     * @swagger
     * /users/info:
     *   get:
     *     summary: 사용자 정보 조회
     *     description: 사용자 정보를 반환합니다.
     *     parameters:
     *       - name: userKey
     *         in: query
     *         required: true
     *         description: 사용자 키
     *         schema:
     *           type: integer  # userKey는 정수형
     *     responses:
     *       200:
     *         description: 성공적으로 사용자 정보를 반환합니다.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     userKey:
     *                       type: integer  # userKey는 정수형
     *                       example: 1
     *                     userName:
     *                       type: string
     *                       example: "John Doe"
     *                     mbti:
     *                       type: string
     *                       example: "INTJ"
     *                     role:
     *                       type: string
     *                       nullable: true
     *                       example: null
     */
    try {
        const userKey = req.query.userKey; // 쿼리에서 userKey 가져오기

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