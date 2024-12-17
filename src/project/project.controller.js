import HttpException from "../middlewares/errorHandler.js";
import {
  getFinishProjectInfoService,
  getProjectInfoService,
  getSpecificProjectInfoService,
  getWorkingProjectService,
  taskMakeService,
  projectMakeService,
} from "./project.service.js";

export const getProjectInfo = async (req, res, next) => {
  /* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get all project info'
  #swagger.description = 'get all of project info'
  #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ProjectMatchUser" },
        },
      }
    }

  #swagger.responses[201] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/ProjectMatchUser" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
  try {
    const { userKey } = req.body; // 요청 본문에서 userKey 가져오기
    const project = await getProjectInfoService(userKey);

    console.log("controller : ", project);

    if (!project) {
      return next(new HttpException(404, "Project not found"));
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getSpecificProjectInfo = async (req, res, next) => {
  /* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get one specific project info'
  #swagger.description = 'get specific project info'
  #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SpecificProject" },
        },
      }
    }

  #swagger.responses[201] = {
  description: 'Project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
  try {
    const { projectKey } = req.params;

    const userKey = req.body.userKey;

    console.log("Router : ", projectKey, userKey);

    const findProject = await getSpecificProjectInfoService(
      userKey,
      projectKey
    );

    if (!findProject) {
      return next(new HttpException(404, "Project not found"));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return error;
  }
};

export const getWorkingProjectInfo = async (req, res, next) => {
  /* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'project in progress'
  #swagger.description = 'project in progress'
  #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SpecificProject" },
        },
      }
    }

  #swagger.responses[201] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */

  try {
    const userKey = req.body.userKey;

    console.log("Router : ", userKey);
    const findProject = await getWorkingProjectService(userKey);

    if (!findProject) {
      return next(new HttpException(404, "Project not found"));
    }
  } catch (error) {
    return error;
  }
};

export const getFinishProjectInfo = async (req, res, next) => {
  /* #swagger.tags = ['getProjectInfo']
    #swagger.summary = 'project finish info'
    #swagger.description = 'project finish'
    #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/SpecificProject" },
          },
        }
      }
  
    #swagger.responses[201] = {
    description: 'project info get 성공',
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/SpecificProject" },
      }
    }
  } 
    #swagger.responses[400] = {
      description: '잘못된 요청 형식'
  } */

  try {
    const userKey = req.body.userKey;

    console.log("Router : ", userKey);
    const findProject = await getFinishProjectInfoService(userKey);

    if (!findProject) {
      return next(new HttpException(404, "Project not found"));
    }
  } catch (error) {
    return error;
  }
};

export const projectMakeController = async (req, res, next) => {
  try {
    const projectData = req.body;
    const userKey = req.user.key;
    const makeResult = await projectMakeService(projectData, userKey);
    if (!makeResult) {
      return next(new HttpException(400, "잘못된 형식의 정보 전송"));
    }
    res.status(200).json({ success: true, data: makeResult });
  } catch (error) {
    console.error(error.message);
  }
};

export const taskMakeController = async (req, res, next) => {
  try {
    const userKey = req.user.key;
    const taskData = req.body;
    const makeResult = await taskMakeService(taskData, userKey);
    if (!makeResult) {
      return next(new HttpException(400, "잘못된 형식의 정보 전송"));
    }
    res.status(200).json({ success: true, data: taskData });
  } catch (error) {
    return error.message;
  }
};
=======
import { StatusCodes } from "http-status-codes";
import HttpException from "../middlewares/errorHandler.js";
import { bodyToTask, bodyToTaskPut } from "./dtos/project.dto.js";
import { createTask, deleteTaskService, getFinishProjectInfoService, getLeastProjectInfoService, getProjectInfoService, getRecentProjectInfoService, getSpecificProjectInfoService, getWorkingProjectService, putTaskService } from "./project.service.js";


export const getProjectInfo = async (req, res, next) => {
/* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get all project info'
  #swagger.description = 'get all of project info'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get all project info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
    try {
      const { key, id } = req.user; // 쿼리에서 userKey 가져오기
        
      let userKey = key;

        console.log(userKey);
        const project = await getProjectInfoService(userKey);
        
        console.log("controller : ", project);

        if (!project) {
            return next(new HttpException(404, "Project not found"));
        }

        return res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};



export const getSpecificProjectInfo = async (req, res, next) => {
/* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get one specific project info'
  #swagger.description = 'get one specific project info'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get one specific project info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }
  #swagger.parameters['projectKey'] = {
    in: 'path',                            
    description: 'get one specific project info',                   
    required: 'true',                     
    type: 'number',
        schema: {
            type : "integer"
        }          
  }

   #swagger.responses[200] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
    try {
        const { key, id } = req.user;
        const { projectKey } = req.params;
        
        let userKey = key;
        
        console.log("Router : ",userKey, projectKey);
      
        const findProject = await getSpecificProjectInfoService(userKey, projectKey); 

        if(!findProject) {
            return next(new HttpException(404, "Project not found"));
        }

        return res.status(200).json({ success: true, data: findProject });
    } catch (error) {
        return error;
    }
};

export const getWorkingProjectInfo = async (req, res, next) => {
/* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get working project info'
  #swagger.description = 'get working project info'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get all project info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */

  try {
    const { key, id } = req.user; // 쿼리에서 userKey 가져오기
        
    let userKey = key;

    console.log("Router : ", userKey);
    const findProject = await getWorkingProjectService(userKey);

    if(!findProject) {
      return next(new HttpException(404, "Project not found"));
  }
    return res.status(200).json({ success: true, data: findProject });
  } catch (error) {
    console.log(error);
    return error;
  }

};


export const getFinishProjectInfo = async (req, res, next) => {
/*
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get finished project info'
  #swagger.description = 'get finished project info'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get finished project info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
  
    try {
      const { key, id } = req.user; // 쿼리에서 userKey 가져오기
        
      let userKey = key;

      console.log("Router : ", userKey);
      const findProject = await getFinishProjectInfoService(userKey);
  
      if(!findProject) {
        return next(new HttpException(404, "Project not found"));
    }
    return res.status(200).json({ success: true, data: findProject });
    } catch (error) {
      return error;
    }
  };

export const getRecentProjectInfo = async (req, res, next) => {
/* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get Recent project info'
  #swagger.description = 'get Recent project info'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get Recent project info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
    
    try {
      const { key, id } = req.user; // 쿼리에서 userKey 가져오기
        
      let userKey = key;

      console.log("Router : ", userKey);
      const findProject = await getRecentProjectInfoService(userKey);
    
      if(!findProject) {
          return next(new HttpException(404, "Project not found"));
      }
      return res.status(200).json({ success: true, data: findProject });
      } catch (error) {
        console.log(error);
        return error;
      }
    };

export const getLeastProjectInfo = async (req, res, next) => {
/* #swagger.tags = ['getProjectInfo']
  #swagger.summary = 'get least project info'
  #swagger.description = 'get least project info'
  #swagger.parameters['userKey'] = {
        in: 'path',                            
        description: 'get least project info',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'project info get 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/SpecificProject" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
      
    try {
      const { key, id } = req.user; // 쿼리에서 userKey 가져오기
        
      let userKey = key;

      console.log("Router : ", userKey);
      const findProject = await getLeastProjectInfoService(userKey);
      
      if(!findProject) {
        return next(new HttpException(404, "Project not found"));
      }
      return res.status(200).json({ success: true, data: findProject });
    } catch (error) {
      return error;
    }
};


export const addTaskController = async(req, res, next) => {
  /* #swagger.tags = ['Task']
  #swagger.summary = 'add task'
  #swagger.description = 'add task'
  #swagger.parameters['projectKey'] = {
        in: 'path',                            
        description: 'add task',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'add task 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/TaskTable" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
} */
  console.log("add task");
  console.log("body:", req.body); 
  const { key, id } = req.user;

  const newTask = await createTask(bodyToTask(req.body), key);
  res.status(StatusCodes.OK).json({ result : newTask });
};


export const putTaskController = async (req, res, next) => {
  /* #swagger.tags = ['Task']
     #swagger.summary = 'Update task'
     #swagger.description = 'Update a task with the provided details.'
     #swagger.consumes = ['application/json'] 
     #swagger.parameters['TaskKey'] = {
        in: 'path',
        description: 'Task Key to identify the task',
        required: true,
        type: 'integer'
     }
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taskName: { type: "string" },
                taskProgress: { type: "integer" },
                taskStartDate: { type: "string", format: "date-time" },
                taskEndDate: { type: "string", format: "date-time" }
              },
              required: ["taskName", "taskProgress"]
            }
          }
        }
     }
     #swagger.responses[200] = {
        description: 'Task updated successfully',
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TaskTable" }
          }
        }
     }
  */

  try {
    const { taskKey } = req.params;
    const { key: userKey } = req.user;

    const putTask = await putTaskService(bodyToTaskPut(req.body), taskKey, userKey);

    if (!putTask) {
      return next(new HttpException(404, "Task does not exist"));
    }

    return res.status(200).json({ success: true, data: putTask });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};


export const deleteTaskController = async (req, res, next) => {
  /* #swagger.tags = ['Task']
  #swagger.summary = 'add task'
  #swagger.description = 'add task'
  #swagger.parameters['TaskKey'] = {
        in: 'path',                            
        description: 'put task',                   
        required: 'true',                     
        type: 'number',
        schema: {
            type : "integer"
        }        
  }

  #swagger.responses[200] = {
  description: 'add task 성공',
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/TaskTable" },
    }
  }
} 
  #swagger.responses[400] = {
    description: '잘못된 요청 형식'
}  */
  
    try { 
      const { key, id } = req.user;
      const { taskKey } = req.params;

      console.log("params" , key, taskKey);

      const deleteTask = await deleteTaskService(key, taskKey);

      if(!deleteTask) {
        return next(new HttpException(404, "Task is not Exsist"));
      }
      return res.status(200).json({ success: true, data: deleteTask });
    } catch(error) {
      console.log(error);
      return error;
    }
};