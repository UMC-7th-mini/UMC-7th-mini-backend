import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loginRepository = async id => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: { userId: id },
    });

    if (!userInfo) {
      throw new Error("Invalid Id");
    }
    return userInfo;
  } catch (error) {
    console.error("Error in loginRepository:", error.message);
    throw error;
  }
};

const addToken = async (id, token) => {
  try {
    const addToken = await prisma.user.update({
      where: { userId: id },
      data: { token: token },
    });
    console.log(addToken);
  } catch (error) {
    console.error("Error in addToken", error.message);
  }
};

const logoutRepository = async id => {
  try {
    const addToken = await prisma.user.update({
      where: { userId: id },
      data: { token: null },
    });
    console.log(addToken);
  } catch (error) {}
};

export { loginRepository, logoutRepository, addToken };
