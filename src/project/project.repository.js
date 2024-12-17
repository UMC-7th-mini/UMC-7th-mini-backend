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
          project: {
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
              userKey: true, // 필요 시 팀원의 ID도 가져올 수 있음
              userId : true,
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
          userKey : true,
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
              userId : true,
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


// 1유저에 대한 프로젝트와 그에 대한 Task
 export const getUserMatchPrivateProjectRepository = async (userKey) => {
  try {
    // `userKey`를 기준으로 관련된 프로젝트 및 사용자 이름 가져오기
    const projectInfos = await prisma.projectInfo.findMany({
      where: {
        userKey: parseInt(userKey), // ProjectInfo 모델의 userKey로 필터링
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
        userKey: parseInt(userKey), // 해당 유저의 Task만 가져오기
      },
      select: {
        userKey: true,
        taskName: true,
        taskProgress: true,
        taskStartDate: true,
        taskEndDate: true,
        projectKey: true, // 어떤 프로젝트와 연결된 Task인지 확인하기 위해 포함
      },
    });

    // 프로젝트와 TaskTable 데이터를 매핑
    const projects = projectInfos.map(info => {
      const relatedTasks = tasks.filter(task => task.projectKey === info.project.projectKey); // 각 프로젝트에 연결된 TaskTable

      return {
        userName: info.user.userName, // 요청한 사용자의 이름
        ...info.project,
        tasks: relatedTasks, // 해당 프로젝트에 연결된 Task 데이터 추가
      };
    });

    if (!projects || projects.length === 0) {
      throw new Error("No projects found for this user.");
    }

    return projects; // 프로젝트 및 Task 정보와 사용자 이름 반환
  } catch (error) {
    console.error("Error fetching user match project:", error);
    throw error;
  }
};



// project 1개에 대한 정보
export const getUserMatchProjectRepository = async (userKey, projectKey) => {
  // 유저 존재 여부 확인
  const userExists = await prisma.user.findUnique({
      where: {
          userKey: parseInt(userKey), // userKey 필터링
      },
  });

  if (!userExists) {
      throw new HttpException(404, "User not found"); // 유저가 존재하지 않을 때 404 반환
  }

  // 프로젝트 정보 조회
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
                          userKey: true,
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

  if (!projectInfo || projectInfo.length === 0) {
    throw new Error("No projects found for this user.");
  }
  // 프로젝트가 존재하지 않을 경우 404 에러 반환

  // project 필드에 포함된 Project 정보 반환
  return {
      ...projectInfo.project,
      tasks: projectInfo.project.taskTables, // TaskTable 정보 추가
  };
};


// 진행 중인 프로젝트
export const getWorkingProjectRepository = async (userKey) => {
  try {
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
    
    if (!projectInfos || projectInfos.length === 0) {
    throw new nonUser("No ongoing projects found for this user.");
    }

    // 로그 추가
    console.log("Raw projectInfos: ", JSON.stringify(projectInfos, null, 2));
    

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
  } catch (error) {
    throw new nonUser("No ongoing projects found for this user.");
  }
};
    


// 끝난 프로젝트 조회회
export const getFinishProjectRepository = async (userKey) => {
  try {
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

    if (!projectInfos || projectInfos.length === 0) {
        throw new nonUser("No ongoing projects found for this user.");
    }

    // 로그 추가
    console.log("Raw projectInfos: ", JSON.stringify(projectInfos, null, 2));
    

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
  } catch (error) {
    throw new nonUser("No ongoing projects found for this user.");
  }
};


// 조회 순서 최근, 오래된 것
export const getRecentProjectRepository = async (userKey) => {
  try {
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
  } catch (error) {
    throw new nonUser("No recent projects found.");
  }
};

//
export const getLeastProjectRepository = async (userKey) => {
 try {
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
  } catch (error) {
    throw new nonUser("No recent projects found.");
  }
};

export const putTaskRepository = async (data, taskKey) => {
  const { taskName, taskProgress, taskStartDate, taskEndDate, userKey, projectKey } = data;

  const existingTask = await prisma.taskTable.findUnique({
    where: { taskKey: parseInt(taskKey, 10) },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  // 3. 업데이트 수행
  const updatedTask = await prisma.taskTable.update({
    where: { taskKey: parseInt(taskKey, 10) },
    data: {
      taskName: taskName,
      taskProgress: taskProgress,
      taskStartDate: new Date(taskStartDate),
      taskEndDate: new Date(taskEndDate),
      userKey: userKey, 
      projectKey: projectKey || existingTask.projectKey,
    },
  });

  return updatedTask;
};


  export const deleteTaskRepository = async (key, taskKey) => {
    try {
      // taskKey와 userKey로 태스크 검색
      const existingTask = await prisma.taskTable.findFirst({
        where: {
          taskKey: parseInt(taskKey), // taskKey를 정수로 변환
          userKey: parseInt(key),    // userKey 조건 추가
        },
      });
  
      // 태스크가 존재하지 않으면 에러 발생
      if (!existingTask) {
        throw new Error("Task not found or not authorized to delete this task.");
      }
  
      // 태스크 삭제
      const deletedTask = await prisma.taskTable.delete({
        where: {
          taskKey: existingTask.taskKey,
        },
      });
  
      return deletedTask;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Task deletion failed.");
    }
  };


  export const projectMakeRepository = async (projectInfo, userKey) => {
    try {
      // 유효한 팀원 확인 (userKey + teamMemberIds)
      const validUsers = await prisma.user.findMany({
        where: {
          userKey: {
            in: [userKey, ...projectInfo.teamMemberIds], // 생성자 + 팀원 ID
          },
        },
        select: { userKey: true },
      });
  
      const validUserKeys = validUsers.map(user => user.userKey);
  
      // 검증: 모든 팀원이 유효한지 확인
      if (!validUserKeys.includes(userKey)) {
        throw new Error("Invalid creator userKey");
      }
  
      const missingKeys = projectInfo.teamMemberIds.filter(
        id => !validUserKeys.includes(id)
      );
      if (missingKeys.length > 0) {
        throw new Error(
          `The following team member IDs are invalid: ${missingKeys.join(", ")}`
        );
      }
  
      // 프로젝트 생성
      const project = await prisma.project.create({
        data: {
          totalPeople: projectInfo.teamMemberIds.length + 1, // 팀원 수 (생성자 포함)
          totalProgress: 0, // 초기 진행률
          startDate: projectInfo.startDate, // 시작 날짜
          endDate: projectInfo.endDate, // 종료 날짜
          projectName: projectInfo.projectName, // 프로젝트 이름
          taskCount: 0, // 초기 작업 수
          currentProgress: "0", // 초기 진행 상태
          plantKey: projectInfo.plantKey || null, // 선택적 필드
          privateCalKey: projectInfo.privateCalKey || null, // 선택적 필드
        },
      });
  
      // 팀원 관계 설정 (ProjectInfo)
      const projectInfos = [
        {
          userKey, // 생성자 userKey
          projectKey: project.projectKey, // 생성된 프로젝트의 projectKey
          importance: true, // 생성자는 중요 역할로 설정
          authority: "ADMIN", // 생성자는 ADMIN 권한
        },
        ...projectInfo.teamMemberIds.map(teamMemberKey => ({
          userKey: teamMemberKey, // 팀원 userKey
          projectKey: project.projectKey, // 생성된 프로젝트의 projectKey
          importance: false, // 기본값
          authority: "MEMBER", // 팀원은 MEMBER 권한
        })),
      ];
  
      // 관계 데이터 저장
      await prisma.projectInfo.createMany({
        data: projectInfos,
      });
  
      return {
        message: "Project created successfully",
        project,
      };
    } catch (error) {
      console.error("Error in createProject:", error.message);
      throw error;
    }
  };
  

  export const taskMakeRepository = async (taskInfo, userKey) => {
    try {
      // Task 생성
      const task = await prisma.taskTable.create({
        data: {
          taskName: taskInfo.taskName, // 작업 이름
          taskProgress: taskInfo.taskProgress || "Not Started", // 진행 상태 (기본값: Not Started)
          taskStartDate: new Date(taskInfo.taskStartDate), // 작업 시작 날짜
          taskEndDate: new Date(taskInfo.taskEndDate), // 작업 종료 날짜
          userKey: userKey, // 담당자의 userKey
          projectKey: taskInfo.projectKey, // 프로젝트 ID
        },
      });
  
      return task;
    } catch (error) {
      console.error("Error in taskMakeRepository:", error.message);
      throw error;
    }
  };