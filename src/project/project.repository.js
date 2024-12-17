import { PrismaClient } from "@prisma/client";
import { nonUser } from "./dtos/project.dto.js";
import HttpException from "../middlewares/errorHandler.js";

const prisma = new PrismaClient(); // PrismaClient 인스턴스 생성

// 1 유저에 대한 모든 프로젝트 정보
export const getUserMatchProject = async userKey => {
  const projects = await prisma.projectInfo.findMany({
    where: {
      userKey: userKey,
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
  });

  console.log("repository : ", projects);

  if (!projects) {
    throw new nonUser();
  }

  return projects.map(projectInfo => projectInfo.project); // 프로젝트 정보 반환
};

// project 1개에 대한 정보
export const getUserMatchProjectRepository = async (userKey, projectKey) => {
  const user = await prisma.projectInfo.findFirst({
    where: {
      userKey: userKey,
      projectKey: projectKey,
    },
    select: {
      projectName: true,
      totalProgress: true,
      startDate: true,
      endDate: true,
    },
  });

  console.log("repository : ", projects);

  if (!user) {
    throw next(new HttpException(404, "Project not fount"));
  }
  return user;
};

export const getWorkingProjectRepository = async userKey => {
  const user = await prisma.projectInfo.findFirst({
    where: {
      userKey: userKey,
      totalProgress: {
        lt: 100,
      },
      endDate: {
        gt: new Date(), // 종료일이 현재 날짜보다 이후
      },
    },
    select: {
      projectName: true,
      totalProgress: true,
      startDate: true,
      endDate: true,
    },
  });

  console.log("repository : ", projects);

  if (!user) {
    throw next(new HttpException(404, "Project not fount"));
  }
  return user;
};

export const getFinishProjectRepository = async userKey => {
  const user = await prisma.projectInfo.findFirst({
    where: {
      userKey: userKey,
      totalProgress: 100,
      AND: [
        {
          startDate: {
            equals: endDate, // 시작일과 종료일이 같은 조건
          },
        },
      ],
    },
    select: {
      projectName: true,
      totalProgress: true,
      startDate: true,
      endDate: true,
    },
  });

  if (!user) {
    throw next(new HttpException(404, "Project not fount"));
  }
  return user;
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
        startDate: new Date(projectInfo.startDate), // 시작 날짜
        endDate: new Date(projectInfo.endDate), // 종료 날짜
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
