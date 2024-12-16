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
/* #swagger.tags = ['getProjectInfo']
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


export const putTaskController = async(req, res, next) => {
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
      const { taskKey } = req.params;
      console.log("taskKey:", taskKey);
      console.log("body:", req.body);
  
      const putTask = await putTaskService(bodyToTaskPut(req.body), taskKey);
  
      if (!putTask) {
        return next(new HttpException(404, "Task does not exist"));
      }
  
      return res.status(200).json({ success: true, data: putTask });
  
    } catch (error) {
      console.log(error);
      return next(error);  // 에러 처리
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