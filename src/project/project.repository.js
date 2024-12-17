import { PrismaClient } from "@prisma/client";
import { nonUser } from "./dtos/project.dto.js";
import HttpException from "../middlewares/errorHandler.js";

const prisma = new PrismaClient({log: ['query']}); // PrismaClient 인스턴스 생성


// 1 유저에 대한 모든 프로젝트 정보
export const getUserMatchProject = async (userKey) => {
    try {
      // `userKey`를 기준으로 관련된 프로젝트 및 사용자 이름 가져오기
      const projectInfos = await prisma.projectInfo.findMany({
        where: {
          userKey: parseInt(userKey), // ProjectInfo 모델의 userKey로 필터링
        },
        include: {
          project: { // Project 정보 포함
            select: {
              projectKey: true,
              projectName: true,
              totalProgress: true,
              startDate: true,
              endDate: true,
            },
          },
          user: { // User 정보 포함
            select: {
              userName: true, // 현재 사용자의 이름
            },
          },
        },
      });
  
      // 프로젝트 키 리스트 추출
      const projectKeys = projectInfos.map(info => info.project.projectKey);
  
      // `TaskTable` 데이터를 프로젝트 키를 기준으로 가져오기
      const tasks = await prisma.taskTable.findMany({
        where: {
          projectKey: {
            in: projectKeys, // 해당 프로젝트에 연결된 TaskTable 데이터 필터링
          },
        },
        select: {
          taskName: true,
          taskProgress: true,
          taskStartDate: true,
          taskEndDate: true,
          projectKey: true, // 어떤 프로젝트와 연결된 Task인지 확인하기 위해 포함
        },
      });
  
      // 각 프로젝트에 연결된 팀원 정보 가져오기
      const projectTeamMembers = await prisma.projectInfo.findMany({
        where: {
          projectKey: {
            in: projectKeys, // 해당 프로젝트 키에 연결된 팀원 정보 필터링
          },
        },
        include: {
          user: { // 사용자 정보 포함
            select: {
              userName: true, // 팀원 이름
              userKey: true, // 필요 시 팀원의 ID도 가져올 수 있음
            },
          },
        },
      });
  
      // 프로젝트와 TaskTable, 팀원 데이터를 매핑
      const projects = projectInfos.map(info => {
        const relatedTasks = tasks.filter(task => task.projectKey === info.project.projectKey); // 각 프로젝트에 연결된 TaskTable
        const teamMembers = projectTeamMembers
          .filter(member => member.projectKey === info.project.projectKey) // 프로젝트 키로 필터링
          .map(member => member.user.userName); // 팀원 이름만 추출
  
        return {
          userName: info.user.userName, // 요청한 사용자의 이름
          ...info.project,
          tasks: relatedTasks, // 해당 프로젝트에 연결된 Task 데이터 추가
          teamMembers, // 해당 프로젝트에 연결된 팀원 이름 추가
        };
      });
  
      if (!projects || projects.length === 0) {
        throw new Error("No projects found for this user.");
      }
  
      return projects; // 프로젝트 및 Task 정보와 사용자 이름, 팀원 반환
    } catch (error) {
      console.error("Error fetching user match project:", error);
      throw error;
    }
  };


// project 1개에 대한 정보
export const getUserMatchProjectRepository = async (userKey, projectKey) => {
    const projectInfo = await prisma.projectInfo.findFirst({
        where: {
            userKey: parseInt(userKey), // userKey 필터링
            projectKey: parseInt(projectKey), // projectKey 필터링
        },
        include: {
            project: { // Project 테이블과 조인
                select: {
                    projectName: true,
                    totalProgress: true,
                    taskCount: true,
                    startDate: true,
                    endDate: true,
                    taskTables: { // TaskTable 데이터 포함
                        select: {
                            userKey : true,
                            taskKey: true,
                            taskName: true,
                            taskProgress: true,
                            taskStartDate: true,
                            taskEndDate: true,
                        },
                    },
                },
            },
        },
    });

    console.log("Repository result:", JSON.stringify(projectInfo, null, 2));

    if (!projectInfo) {
        throw new HttpException(404, "Project not found");
    }

    // project 필드에 포함된 Project 정보 반환
    return {
        ...projectInfo.project,
        tasks: projectInfo.project.taskTables, // TaskTable 정보 추가
    };
};


// 진행 중인 프로젝트
export const getWorkingProjectRepository = async (userKey) => {
    const projectInfos = await prisma.projectInfo.findMany({
        where: {
            userKey: parseInt(userKey), // userKey로 필터링
        },
        include: {
            project: {
                select: {
                    projectName: true,
                    totalProgress: true,
                    startDate: true,
                    endDate: true,
                },
            },
        },
    });

    // 로그 추가
    console.log("Raw projectInfos: ", JSON.stringify(projectInfos, null, 2));
    
    if (!projectInfos || projectInfos.length === 0) {
        throw new nonUser("No ongoing projects found for this user.");
    }

    // 2. `Project` 모델에서 필터링
    const filteredProjects = projectInfos
        .map(projectInfo => {
            return projectInfo.project;
        })
        .filter(project => project && project.totalProgress < 100 && new Date(project.endDate) > new Date());

    console.log("Filtered projects: ", filteredProjects);

    if (filteredProjects.length === 0) {
        throw new nonUser("No ongoing projects found for this user.");
    }

    return filteredProjects; // 프로젝트 정보 반환
};
    


// 끝난 프로젝트 조회회
export const getFinishProjectRepository = async (userKey) => {
    const projectInfos = await prisma.projectInfo.findMany({
        where: {
            userKey: parseInt(userKey), // userKey로 필터링
        },
        include: {
            project: {
                select: {
                    projectName: true,
                    totalProgress: true,
                    startDate: true,
                    endDate: true,
                },
            },
        },
    });

    // 로그 추가
    console.log("Raw projectInfos: ", JSON.stringify(projectInfos, null, 2));
    
    if (!projectInfos || projectInfos.length === 0) {
        throw new nonUser("No ongoing projects found for this user.");
    }

    // 2. `Project` 모델에서 필터링
    const filteredProjects = projectInfos
        .map(projectInfo => {
            return projectInfo.project;
        })
        .filter(project => project && project.totalProgress == 100 || new Date(project.endDate) <= new Date());

    console.log("Filtered projects: ", filteredProjects);

    if (filteredProjects.length === 0) {
        throw new nonUser("No ongoing projects found for this user.");
    }

    return filteredProjects; // 프로젝트 정보 반환
};


// 조회 순서 최근, 오래된 것
export const getRecentProjectRepository = async (userKey) => {
    console.log(userKey);
    const projects = await prisma.projectInfo.findMany({
        where: {
            userKey: parseInt(userKey),
        },
        include: {
            project: {
                select: {
                    projectKey: true,
                    projectName: true,
                    totalProgress: true,
                    startDate: true,
                    endDate: true,
                },
            },
        },
        orderBy: [
            {
                project: {
                    endDate: 'desc',
                },
            },
        ],
    });

    console.log("Repository results: ", JSON.stringify(projects, null, 2));

    const filteredProjects = projects
        .filter(projectInfo => projectInfo.project !== null) // null 제거
        .map(projectInfo => projectInfo.project);

    if (!filteredProjects || filteredProjects.length === 0) {
        throw new nonUser("No recent projects found.");
    }

    return filteredProjects; // 프로젝트 정보 반환
};

//
export const getLeastProjectRepository = async (userKey) => {
    console.log(userKey);
    const projects = await prisma.projectInfo.findMany({
        where: {
            userKey: parseInt(userKey),
        },
        include: {
            project: {
                select: {
                    projectKey: true,
                    projectName: true,
                    totalProgress: true,
                    startDate: true,
                    endDate: true,
                },
            },
        },
        orderBy: [
            {
                project: {
                    endDate: 'asc',
                },
            },
        ],
    });

    console.log("Repository results: ", JSON.stringify(projects, null, 2));

    const filteredProjects = projects
        .filter(projectInfo => projectInfo.project !== null) // null 제거
        .map(projectInfo => projectInfo.project);

    if (!filteredProjects || filteredProjects.length === 0) {
        throw new nonUser("No recent projects found.");
    }

    return filteredProjects; // 프로젝트 정보 반환
};


export const addTask = async (data, key) => {
    const created = await prisma.TaskTable.create({ data : {
        taskName : data.taskName,
        taskProgress : data.taskProgress,
        taskStartDate : data.taskStartDate,
        taskEndDate : data.taskEndDate,
        userKey : key,
        projectKey : data.projectKey,
    }});
    return created.id;
};


export const putTaskRepository = async (data, taskKey) => {
    const { taskName, taskProgress, taskStartDate, taskEndDate, userKey, projectKey } = data;
  
    const existingTask = await prisma.taskTable.findUnique({
      where: { taskKey: taskKey },
    });
  
    if (!existingTask) {
      throw new Error("Task not found");
    }
  
    if (existingTask.userKey !== userKey) {
      throw new Error("Unauthorized to update this task");
    }
  
    const updatedTask = await prisma.taskTable.update({
      where: {
        taskKey: taskKey, 
      },
      data: {
        taskName: taskName,
        taskProgress: taskProgress,
        taskStartDate: taskStartDate,
        taskEndDate: taskEndDate,
        userKey: userKey, 
        projectKey: projectKey,
      },
    });
  
    return updatedTask; 
  };


  export const deleteTaskRepository = async (key, taskKey) => {
    try {
      const task = await prisma.taskTable.delete({
        where: {
            taskTables: {
            taskKey: taskKey,
            userKey: key,
          },
        },
      });
      return task;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Task deletion failed.");
    }
  };