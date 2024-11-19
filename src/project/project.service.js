import { nonUser } from "./dtos/project.dto.js";
import { getUserMatchProject } from "./project.repository.js";


export const getProjectInfoService = async (userKey) => {
    const project = await getUserMatchProject(userKey);

    console.log("service : ", project);

    if (!project) {
        throw new nonUser();
    }

    return project;
};