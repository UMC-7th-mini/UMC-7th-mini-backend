import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const signUpRepository = async signUpData => {
  try {
    const { userId, userName, userPassword, userEmail, gender, birth } =
      signUpData;

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = await prisma.user.create({
      data: {
        userId,
        userName,
        userPassword: hashedPassword,
        userEmail,
        gender,
        birth,
      },
    });
    return user;
  } catch (error) {
    console.error("Error in signUpRepository:", error.message);
    throw error;
  }
};

const duplicateRepository = async id => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: id }, // Prisma 스키마에 정의된 고유 필드
    });
    if (user == null) {
      return "notDuplicate";
    }
    return "Duplicate";
  } catch (error) {
    console.error("Error in duplicateRepository:", error.message);
    throw error; // 필요하면 호출자에게 에러 전달
  }
};

const signOutRepository = async id => {
  try {
    // 사용자를 먼저 조회
    const user = await prisma.user.findUnique({
      where: { userId: id },
    });

    if (user == null) {
      return "notFoundId"; // 사용자가 존재하지 않는 경우
    }

    // 사용자 삭제
    await prisma.user.delete({
      where: { userId: id },
    });

    return "deleteSuccess"; // 삭제 성공 메시지 반환
  } catch (error) {
    console.error(`Error during signOut: ${error.message}`);
    throw new Error("Error during sign out process");
  }
};

// Default Export로 객체 내보내기
export default {
  signUpRepository,
  duplicateRepository,
  signOutRepository,
};
