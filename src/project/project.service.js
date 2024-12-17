import HttpException from "../middlewares/errorHandler.js";
import { nonUser, taskPostResponseDto } from "./dtos/project.dto.js";
import { deleteTaskRepository, getFinishProjectRepository, getLeastProjectRepository, getRecentProjectRepository, getUserMatchPrivateProjectRepository, getUserMatchProject, getUserMatchProjectRepository, getWorkingProjectRepository, putTaskRepository } from "./project.repository.js";


export const getProjectInfoService = async (userKey) => {
    const project = await getUserMatchProject(userKey);

    console.log("service : ", project);

    if (!project) {
        throw new nonUser();
    }

    return project;
};


export const getPrivateProjectInfoService = async (userKey) => {
    const project = await getUserMatchPrivateProjectRepository(userKey);

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



export const putTaskService = async (data, taskKey, userKey) => {
    const updatedTask = await putTaskRepository({
      taskName: data.taskName,
      taskProgress: data.taskProgress,
      taskStartDate: data.taskStartDate,
      taskEndDate: data.taskEndDate,
      projectKey: data.projectKey, // body에 projectKey가 있다면 전달
      userKey: userKey, // 토큰에서 받아온 userKey
    }, taskKey);
  
    if (!updatedTask) {
      throw new Error("Task update failed");
    }
    return updatedTask;
  };
  


export const deleteTaskService = async (key, taskKey) => {
    try {
      console.log("Service - Deleting Task:", { key, taskKey });
  
      // userKey를 매개변수로 전달받은 key로 사용
      const deletedTask = await deleteTaskRepository(key, taskKey);
  
      return deletedTask;
    } catch (error) {
      console.error("Error in deleteTaskService:", error.message);
      throw error;
    }
  };
