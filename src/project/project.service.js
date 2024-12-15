import HttpException from "../middlewares/errorHandler.js";
import userRepository from "../user/user.repository.js";
import { nonUser } from "./dtos/project.dto.js";
import { getFinishProjectRepository, getUserMatchProject, getUserMatchProjectRepository } from "./project.repository.js";


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

export const getWorkingProjectService = async (userKey) => {
    const project = await getWorkingProjectRepository (userKey);

    console.log("service : ", userKey);

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


export const getFinishProjectInfoService = async (userKey) => {
    const project = await getFinishProjectRepository (userKey);

    console.log("service : ", userKey);

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