import HttpException from "../middlewares/errorHandler.js";
import { getProjectInfoService, getSpecificProjectInfoService } from "./project.service.js";


export const getProjectInfo = async (req, res, next) => {
    try {
        const userKey = req.body.userKey;
        const project = await getProjectInfoService(userKey);
        
        console.log("controller : ", project);

        if(!project) {
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