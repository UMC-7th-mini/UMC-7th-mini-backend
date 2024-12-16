import HttpException from "../middlewares/errorHandler.js";
import userRepository from "../user/user.repository.js";
import { nonUser, taskPostResponseDto } from "./dtos/project.dto.js";
import { addTask, deleteTaskRepository, getFinishProjectRepository, getLeastProjectRepository, getRecentProjectRepository, getUserMatchProject, getUserMatchProjectRepository, getWorkingProjectRepository, putTaskRepository } from "./project.repository.js";


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


export const getRecentProjectInfoService = async (userKey) => {
    const project = await getRecentProjectRepository (userKey);

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


export const getLeastProjectInfoService = async (userKey) => {
    const project = await getLeastProjectRepository (userKey);

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


export const createTask = async (data, key) => {
    const addTaskKey = await addTask({
        taskName : data.taskName,
        taskProgress : data.taskProgress,
        taskStartDate : data.taskStartDate,
        taskEndDate : data.taskEndDate,
        userKey : key,
        projectKey : data.projectKey,
    });

    if(addTaskKey === null) {
        throw new Error("존재하지 않는 과제입니다.");
    }

    const task = await getTask(addTaskKey);
    return taskPostResponseDto(task);
}


export const putTaskService = async (data, taskKey) => {
    const putTaskKey = await putTaskRepository({
        taskName : data.taskName,
        taskProgress : data.taskProgress,
        taskStartDate : data.taskStartDate,
        taskEndDate : data.taskEndDate,
        userKey : data.userKey,
    });

    if(!putTaskKey) {
        throw new Error("Task update Faile");
    }
    return putTaskKey;
}


export const deleteTaskService = async(key, taskKey) => {
    const task = await deleteTaskRepository (key, taskKey);

    console.log("service : ", userKey);

    if (!task) {
        if(!userKey) {
            throw next(new HttpException(404, "User not Fount"));
        }
        if(!taskKey) {
            throw next(new HttpException(404, "Project not Found"));
        }
        throw new nonUser();
    }
    return task;
};