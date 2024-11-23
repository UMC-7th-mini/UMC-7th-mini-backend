import HttpException from "../../middlewares/errorHandler.js";

export const projectInfoDTO = {
    projectKey : "projectKey",
    projectName : "projectName",
    projectType : "projectType",
    projectStatus : "projectStatus",
    totalPeople : "totalPeople",
    startData : "startData",
    endDate : "endDate",
    taskCount : "taskCount",
    plantKey : "plantKey",
    privateCalKey : "privateCalKey",
    currentProgress : "currentProgress"
}


  // user id가 없는 에러를 출력
  export const nonUser = data => {
    if(!data) {
      throw new HttpException(
        404,
        "User not found"
      );
    }
  };
  