import projectRepository from "./project.repository.js";

const projectMake = async (projectInfo) => {
  try {
    // 프로젝트 생성 로직
    return await projectRepository.projectMake(projectInfo);
  } catch (error) {
    throw new Error("Error in project creation service");
  }
};

export default {
  projectMake,
};
