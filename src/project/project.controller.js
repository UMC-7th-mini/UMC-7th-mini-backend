import HttpException from "../middlewares/errorHandler.js";
import { getFinishProjectInfoService, getProjectInfoService, getSpecificProjectInfoService, getWorkingProjectService } from "./project.service.js";


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
        const { projectKey} = req.params;

        const userKey = req.body.userKey;

        console.log("Router : ",projectKey, userKey);

        const findProject = await getSpecificProjectInfoService(userKey, projectKey); 

        if(!findProject) {
            return next(new HttpException(404, "Project not found"));
        }

        return res.status(200).json({success : true});
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

    if(!findProject) {
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
  
      if(!findProject) {
        return next(new HttpException(404, "Project not found"));
    }
  
    } catch (error) {
      return error;
    }
  };