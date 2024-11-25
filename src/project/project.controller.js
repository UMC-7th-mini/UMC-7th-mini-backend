import HttpException from "../middlewares/errorHandler.js";
import { getProjectInfoService, getSpecificProjectInfoService } from "./project.service.js";


export const getProjectInfo = async (req, res, next) => {
    /**
 * @swagger
 * /user/projects:
 *   post:
 *     summary: "특정 유저의 모든 프로젝트 정보 가져오기"
 *     description: "주어진 userKey에 해당하는 유저의 모든 프로젝트 정보를 반환합니다."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userKey:
 *                 type: integer
 *                 description: "유저의 고유 키"
 *     responses:
 *       200:
 *         description: "프로젝트 정보가 성공적으로 반환됨"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: "요청 성공 여부"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       projectKey:
 *                         type: integer
 *                         description: "프로젝트의 고유 키"
 *                       projectName:
 *                         type: string
 *                         description: "프로젝트 이름"
 *                       totalProgress:
 *                         type: number
 *                         description: "프로젝트의 전체 진행률"
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: "프로젝트 시작 날짜"
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: "프로젝트 종료 날짜"
 *       404:
 *         description: "해당 유저가 존재하지 않거나 프로젝트가 없음"
 *       500:
 *         description: "서버 오류"
 */
    try {
        const { userKey } = req.body; // 요청 본문에서 userKey 가져오기
        const project = await getProjectInfoService(userKey);
        
        console.log("controller : ", project);

        if (!project) {
            return next(new HttpException(404, "Project not found"));
        }

        return res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};



export const getSpecificProjectInfo = async (req, res, next) => {
    try {
        const {projectKey} = req.params;

        console.log("Router : ",projectKey);
        const userKey = req.body.userKey;

        console.log("Controller : ", projectKey);

        const findProject = await getSpecificProjectInfoService(userKey, projectKey); 

        if(!findProject) {
            return next(new HttpException(404, "Project not found"));
        }

        return res.status(200).json({success : true});
    } catch (error) {
        return error;
    }
};