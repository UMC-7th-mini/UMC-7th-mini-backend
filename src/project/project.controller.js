import HttpException from "../middlewares/errorHandler.js";
import { getFinishProjectInfoService, getLeastProjectInfoService, getProjectInfoService, getRecentProjectInfoService, getSpecificProjectInfoService, getWorkingProjectService } from "./project.service.js";


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
        const { userKey } = req.params; // 요청 본문에서 userKey 가져오기
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
        const { userKey, projectKey} = req.params;

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
    const {userKey} = req.params;

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
      const {userKey} = req.params;
  
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
      const {userKey} = req.params;
    
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
      const {userKey} = req.params;
      
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