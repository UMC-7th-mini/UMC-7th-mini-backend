import projectService from "./project.service.js";
import HttpException from "../../middlewares/errorHandler.js";

export const projectMake = async (req, res, next) => {
  try {
    const projectInfo = req.body; // 클라이언트에서 전달된 프로젝트 정보

    if (!projectInfo || !projectInfo.name) {
      throw new HttpException(400, "Project information is missing");
    }

    const result = await projectService.projectMake(projectInfo);

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
