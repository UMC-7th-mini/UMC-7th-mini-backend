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
  export class nonUser extends Error {
    constructor(message = "User not found") {
        super(message); // Error 클래스를 상속받아서 메시지를 전달
        this.name = "nonUser"; // 에러 이름을 설정
    }
}