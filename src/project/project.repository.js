import { PrismaClient } from "@prisma/client";
import { nonUser } from "./dtos/project.dto.js";
import HttpException from "../middlewares/errorHandler.js";

const prisma = new PrismaClient(); // PrismaClient 인스턴스 생성


// 1 유저에 대한 모든 프로젝트 정보
export const getUserMatchProject = async (userKey) => {
    const projects = await prisma.projectInfo.findMany ({
        where: {
            userKey: userKey,
        },
        include : {
            project : {
                select : {
                    projectKey: true,
                    projectName: true,
                    totalProgress: true,
                    startDate: true,
                    endDate: true,
                }
            }
         }
    });

    console.log("repository : ", projects);

    if(!projects) {
        throw new nonUser();
    }

    return projects.map(projectInfo => projectInfo.project); // 프로젝트 정보 반환
};



// project 1개에 대한 정보
export const getUserMatchProjectRepository = async (userKey, projectKey) => {
    const user = await prisma.projectInfo.findFirst ({
        where : {
            userKey : userKey,
            projectKey : projectKey
        }, select : {
            projectName: true,
            totalProgress: true,
            startDate: true,
            endDate: true,
        }
    });

    console.log("repository : ", projects);

    if(!user) {
        throw next(new HttpException(404, "Project not fount"));
    }
    return user;
}