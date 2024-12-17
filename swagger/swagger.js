import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "User API",
    description: "API 문서",
  },
  host: "umc-d.kro.kr:3000",
  basePath: "/",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'access token',
      in: 'header',
    },
  },
  definitions: {  // This part needs to be corrected as the previous structure was invalid.
    User: {
      userKey: 1,
      userId: "user",
      userName: "홍길동",
      userEmail: "test@naver.com",
      userPassword: "password",
      gender: "male",
      birth: "1999-01-01",
      role: "user",
      mbti: "ENFP",
    },
    PlantDict: {
      plantKey: 1,
      getDate: "2021-01-01",
      getPlace: "project1",
      userKey: 1,
    },
    PlantDictPlantLink: {
      linkKey: 1,
      userKey: 1,
      plantKey: 1,
      planyDictKey: 1,
    },
    Plant: {
      plantKey: 1,
      plantName: "소나무",
    },
    TaskTable: {
      taskKey: 1,
      taskName: "TaskName", // Fixed typo ("taskNmae")
      taskProgress: "50",
      taskStartDate: "2021-01-01",
      taskEndDate: "2021-12-12",
      userKey: 1,
      projectCalendarKey: 1,
    },
    ProjectCalendar: {
      memoKey: 1,
      memoName: "memoName",
      calendarDate: "2021-01-01",
      memo: "memo detail",
      projectKey: 1,
      privateCalKey: 1,
    },
    ProjectInfo: {
      projectInfoKey: 1,
      userKey: 1,
      projectKey: 1,
      importance: true,
    },
    PrivateCalendar: {
      privateCalendarKey: 1,
      userKey: 1,
    },
    Project: {
      projectKey: 1,
      totalPeople: 1,
      totalProgress: 1,
      startDate: "2021-01-01",
      endDate: "2021-01-01",
      projectName: "project1",
      taskCount: 1,
      plantKey: 1,
      privateKey: 1,
      currentProgress: "50",
    },
    ProjectMatchUser: {
      projectKey: 1,
      projectName: "project1",
      totalProgress: 1,
      startDate: "2021-01-01",
      endDate: "2021-01-01",
    },
    SpecificProject: {
      projectName: "project1",
      totalProgress: 1,
      startDate: "2021-01-01",
      endDate: "2021-01-01",
    },
    SignUser: {
      userId: "user11652",
      userName: "John Doe",
      userPassword: "securepassword123",
      userEmail: "john.doe@example.com",
      gender: "MALE",
      birth: "1990-01-01T00:00:00.000Z",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../src/index.js"];

const generateSwagger = swaggerAutogen({ openapi: "3.0.0" });
generateSwagger(outputFile, endpointsFiles, doc);
