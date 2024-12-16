import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        version: "1.0.0",
        title: "User API",
        description: "API 문서",
    },
    host: "3.34.133.236:3000",
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
    components :{
        schemas: {
            duplicationUsers :{
                resultType : 'FAIL',
                error : {
                    errorCode : 'U001',
                    reason : '이미 존재하는 이메일입니다.',
                    data : {
                        userKey : '1',
                        userId : 'user',
                        userName : '홍길동',
                        userEmail : 'test@email.com',
                        gender : 'male',
                        birth : '1999-01-01',
                        role : 'user',
                        mbti : 'ENFP',
                    },
                },
                success : false,
            },
            User:{
                userKey : 1, 
                userId : 'user',
                userName : '홍길동',
                userEmail : 'test@naver.com',
                userPassword : 'password',
                gender : 'male',
                brith : '1999-01-01',
                role : 'user',
                mbti : 'ENFP',
            },
            PlantDict : {
                plantKey : 1,
                getDate : '2021-01-01',
                getPlace : 'project1',
                userKey : 1,
            },
            PlantDictPlantLink : {
                linkKey : 1,
                userKey : 1,
                plantKey : 1,
                planyDictKey : 1,
            },
            Plant : {
                plantKey : 1,
                plantName : '소나무',
            },
            TaskTable : {
                taskKey : 1,
                taskNmae : 'TaskName',
                taskProgress : '50',
                taskStartDate : '2021-01-01',
                taskEndDate : '2021-12-12',
                userKey : 1,
                projectCalendarKey : 1,
            },
            ProjectCalendar : {
                memoKey : 1,
                memoName : 'memoName',
                calendarDate : '2021-01-01',
                memo : 'memo detail',
                projectKey : 1,
                privateCalKey : 1,
            },
            ProjectInfo : {
                projectInfoKey : 1,
                userKey : 1,
                projectKey : 1,
                importance : true,
            },
            PrivateCalendar : {
                privateCalendarKey : 1,
                userKey : 1,
            },
            Project : {
                projectKey : 1,
                totalPeople : 1,
                totalProgress : 1,
                startDate : '2021-01-01',
                endDate : '2021-01-01',
                projectName : 'project1',
                taskCount : 1,
                plantKey : 1,
                privateKey : 1,
                currentProgress : "50",
            }, 
            ProjectMatchUser : {
                projectKey : 1,
                projectName : 'project1',
                totalProgress : 1,
                startDate : '2021-01-01',
                endDate : '2021-01-01',
            }, 
            SpecificProject : {
                projectName : 'project1',
                totalProgress : 1,
                startDate : '2021-01-01',
                endDate : '2021-01-01',
            }, 
        }
    }, 
}
       

const outputFile = './swagger-output.json';
const endpointsFiles = ['../src/index.js'];

const generateSwagger = swaggerAutogen({ openapi: '3.0.0' });
generateSwagger(outputFile, endpointsFiles, doc);