import HttpException from "../middlewares/errorHandler.js";
import { nonUser } from "./dtos/project.dto.js";
import { getUserMatchProject, getUserMatchProjectRepository } from "./project.repository.js";


export const getProjectInfoService = async (userKey) => {
    const project = await getUserMatchProject(userKey);

    console.log("service : ", project);

    if (!project) {
        throw new nonUser();
    }

    return project;
};


export const getSpecificProjectInfoService = async (userKey, projectKey) => {

    const project = await getUserMatchProjectRepository(userKey, projectKey);

    console.log("service : ", project, userKey);

    if (!project) {
        if(!userKey) {
            throw next(new HttpException(404, "User not Fount"));
        }
        if(!project) {
            throw next(new HttpException(404, "Project not Found"));
        }
        throw new nonUser();
    }

    return project;
};