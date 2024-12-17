/** PrismaCclient로 import */
import { PrismaClient } from "@prisma/client"; // PrismaClient 가져오기
import { nonUser } from "../../project/dtos/project.dto.js";

// 인슽턴스 생성 후 사용
const prisma = new PrismaClient({log: ['query']}); // PrismaClient 인스턴스 생성

export const getUserInfoRepository = async (userKey) => {
    const user = await prisma.User.findUnique({ // PrismaClient 인스턴스 사용
        where: {
            userKey: parseInt(userKey), // UserId 대신 id로 수정
        }, select: {
            userName: true, // true로 변경
            mbti: true,     // true로 변경
            role: true      // true로 변경
        }
    }); 

    console.log(user);
    
    if (!user) {
        throw new nonUser(); // nonUser 인스턴스 생성
    }

    return user; // 사용자 정보 반환
};
