import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // User 데이터 생성
  const user = await prisma.user.create({
    data: {
      userId: "user123",
      userName: "John Doe",
      userPassword: "securepassword123",
      userEmail: "john.doe@example.com",
      gender: "MALE",
      birth: new Date("1990-01-01"),
      mbti: "INTJ",
    },
  });

  // Plant 데이터 생성
  const plant = await prisma.plant.create({
    data: {
      plantName: "Rose",
      plantStatus: "Seed",
    },
  });

  // PlantDict 데이터 생성
  const plantDict = await prisma.plantDict.create({
    data: {
      getDate: new Date("2024-01-01"),
      getPlace: "Greenhouse A",
      user: {
        connect: { userKey: user.userKey },
      },
    },
  });

  // PlantDictPlantLink 데이터 생성
  const plantDictPlantLink = await prisma.plantDictPlantLink.create({
    data: {
      userKey: user.userKey,
      plantKey: plant.plantKey,
    },
  });

  // TaskTable 데이터 생성
  const taskTable = await prisma.taskTable.create({
    data: {
      taskName: "Complete Report",
      taskProgress: "In Progress",
      taskStartDate: new Date("2024-01-15"),
      taskEndDate: new Date("2024-02-15"),
      user: {
        connect: { userKey: user.userKey },
      },
    },
  });

  // Project 데이터 생성
  const project = await prisma.project.create({
    data: {
      totalPeople: 5,
      totalProgress: 50,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-06-01"),
      projectName: "Green Initiative",
      taskCount: 10,
      currentProgress: "On Track",
    },
  });

  // ProjectInfo 데이터 생성
  const projectInfo = await prisma.projectInfo.create({
    data: {
      userKey: user.userKey,
      projectKey: project.projectKey,
      importance: true,
      authority: "ADMIN",
    },
  });

  // PrivateCalendar 데이터 생성
  const privateCalendar = await prisma.privateCalendar.create({
    data: {
      user: {
        connect: { userKey: user.userKey },
      },
    },
  });

  // ProjectCalendar 데이터 생성
  const projectCalendar = await prisma.projectCalendar.create({
    data: {
      memoName: "Initial Plan",
      calendarDate: new Date("2024-02-01"),
      memo: "Discuss project goals.",
      project: {
        connect: { projectKey: project.projectKey },
      },
      privateCalendar: {
        connect: { privateCalendarKey: privateCalendar.privateCalendarKey },
      },
    },
  });

  console.log("Mock data created successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
