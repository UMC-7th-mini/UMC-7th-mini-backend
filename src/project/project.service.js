import HttpException from "../middlewares/errorHandler.js";
import userRepository from "../user/user.repository.js";
import { nonUser } from "./dtos/project.dto.js";
import {
  getFinishProjectRepository,
  getUserMatchProject,
  getUserMatchProjectRepository,
  projectMakeRepository,
  taskMakeRepository,
} from "./project.repository.js";

export const getProjectInfoService = async userKey => {
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
    if (!userKey) {
      throw next(new HttpException(404, "User not Fount"));
    }
    if (!project) {
      throw next(new HttpException(404, "Project not Found"));
    }
    throw new nonUser();
  }

  return project;
};

export const getWorkingProjectService = async userKey => {
  const project = await getWorkingProjectRepository(userKey);

  console.log("service : ", userKey);

  if (!project) {
    if (!userKey) {
      throw next(new HttpException(404, "User not Fount"));
    }
    if (!project) {
      throw next(new HttpException(404, "Project not Found"));
    }
    throw new nonUser();
  }

  return project;
};

export const getFinishProjectInfoService = async userKey => {
  const project = await getFinishProjectRepository(userKey);

  console.log("service : ", userKey);

  if (!project) {
    if (!userKey) {
      throw next(new HttpException(404, "User not Fount"));
    }
    if (!project) {
      throw next(new HttpException(404, "Project not Found"));
    }
    throw new nonUser();
  }

  return project;
};

export const projectMakeService = async (projectData, userKey) => {
  try {
    const projectInfo = await projectMakeRepository(projectData, userKey);
    console.log("projectInfo", projectInfo);
    if (!projectInfo) {
      throw new Error("not make project");
    }
    return projectInfo;
  } catch (error) {
    console.error(error.message);
  }
};

export const taskMakeService = async (taskData, userKey) => {
  try {
    const taskInfo = await taskMakeRepository(taskData, userKey);
    console.log("taskInfo", taskInfo);
    if (!taskInfo) {
      throw new Error("not make project");
    }
    return taskInfo;
  } catch (error) {
    console.error(error.message);
  }
};
