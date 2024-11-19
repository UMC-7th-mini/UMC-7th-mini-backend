import { PrismaClient } from "@prisma/client";
import { nonUser } from "./dtos/project.dto.js";

const prisma = new PrismaClient(); // PrismaClient 인스턴스 생성

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