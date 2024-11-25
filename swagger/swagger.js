import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        version: "1.0.0",
        title: "User API",
        description: "API 문서",
    },
    host: "localhost:3000",
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
            }
        }
    }, 
}
       

const outputFile = './swagger-output.json';
const endpointsFiles = ['../src/index.js'];

const generateSwagger = swaggerAutogen({ openapi: '3.0.0' });
generateSwagger(outputFile, endpointsFiles, doc);