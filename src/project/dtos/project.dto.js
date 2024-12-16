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

export const bodyToTask = (body) => {
	const taskStartDate = new Date(body.taskStartDate);
    const taskEndDate = new Date(body.taskEndDate);
	
  return {
    taskName : body.taskName,
    taskProgress : body.taskProgress,
    taskStartDate,
    taskEndDate,
  };
}

export const bodyToTaskPut = (body) => {
	const taskStartDate = new Date(body.taskStartDate);
  const taskEndDate = new Date(body.taskEndDate);
	
  return {
    taskKey : body.taskKey,
    taskName : body.taskName,
    taskProgress : body.taskProgress,
    taskStartDate,
    taskEndDate,
    userKey : body.userKey,
  };
}


export const taskPostResponseDto = (task) => {
    return {
        data: {
            taskKey: task.taskKey.toString(),
            taskName: task.taskName,        
            taskProgress: task.taskProgress, 
            taskStartDate: task.taskStartDate,
            taskEndDate: task.taskEndDate,  
            userKey: task.userKey.toString(),  
            projectKey: task.projectKey.toString(), 
        },
    };
};