import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 개인캘린더 조회 
export const getPrivateCalendar = async (userKey)=> {
    try {
        const privateCalendar = await prisma.PrivateCalendar.findUniqueOrThrow({ where: { userKey: userKey } });
        return privateCalendar;
    } catch (error){
        console.error("개인 캘린더 조회 중 오류: ",error);
        throw new Error("개인 캘린더를 찾을 수 없습니다..");
    }
};

// 개인 메모 추가
export const addPrivateMemo = async (data) => {
    try {
        const createdMemo = await prisma.ProjectCalendar.create({
          data: {
            calendarDate: data.calendarDate,
            memo: data.memo,
            memoName: data.memoName,
            project: {
                connect: { projectKey: data.projectKey } 
            }
          }
        });
        return createdMemo;
    } catch (err) {
        console.error("메모 추가 중 오류: ", err);
        throw new Error("메모 추가 중 오류가 발생했습니다.");
    }
};

//개인 메모 조회 
export const getPrivateMemo = async (privateCalendarKey) => {
    try {
        if (typeof privateCalendarKey !== 'number') {
            throw new Error("privateCalendarKey는 정수여야 합니다.");
        }
        const privateMemo = await prisma.PrivateCalendar.findUniqueOrThrow({
            where: { privateCalendarKey: privateCalendarKey }
        });
        return privateMemo;
    } catch (error){
        console.error("개인 캘린더 메모 조회 중 오류: ",error);
        throw new Error("개인 메모를 찾을 수 없습니다..");
    }
};

// 개인 메모 삭제 
export const deletePrivateMemo = async ({ userKey, memoKey, calendarDate })=> {
    try {
        const deletedMemo = await prisma.PrivateCalendar.deleteMany({
            where: {
                userKey: userKey,
                memoKey: memoKey,
                calendarDate: calendarDate,
            },
        });
        return deletedMemo.count > 0;
    } catch (error) {
        console.error("메모 삭제 중 오류: ", error);
        throw new Error("메모 삭제 중 오류가 발생했습니다.");
    }
};

// 개인 일정 추가 
export const addPrivateSchedule = async (data) => {
    try {
        const createdSchedule = await prisma.PrivateCalendar.create({
          data: {
            userKey: data.userKey,
            startDate: data.startDate,
            endDate: data.endDate,
            schedule: data.schedule,
          }
        });
        return createdSchedule;
    } catch (err) {
        console.error("일정 추가 중 오류: ", error);
        throw new Error("일정 추가 중 오류가 발생했습니다.");
    }
};

// 개인 일정 조회
export const getPrivateSchedule = async (ScheduleKey) => {
    try {
        const privateSchedule = await prisma.PrivateCalendar.findUniqueOrThrow({ where: { ScheduleKey: scheduleKey } });
        return privateSchedule;
    } catch (error){
        console.error("개인 캘린더 일정 조회 중 오류: ",error);
        throw new Error("개인 일정을 찾을 수 없습니다..");
    }
};

// 개인 일정 삭제 
export const deletePrivateSchedule = async ({ userKey, scheduleKey, calendarDate }) => {
    try {
        const deletedSchedule = await prisma.ProjectCalendar.deleteMany({
            where: {
                userKey: userKey,
                scheduleKey: scheduleKey,
                calendarDate: calendarDate,
            },
        });
        return deletedSchedule.count > 0; 
    } catch (error) {
        console.error("일정 삭제 중 오류: ", error);
        throw new Error("일정 삭제 중 오류가 발생했습니다.");
    }
};

// 프로젝트 정보 조회 
export const getProjectInfo = async(projectKey)=> {
    try {
        const privateProjectInfo= await prisma.ProjectCalendar.findUniqueOrThrow({ where: { projectKey: projectKey } });
        return privateProjectInfo;
    } catch (error){
        console.error("개인 캘린더 메모 조회 중 오류: ",error);
        throw new Error("개인 메모를 찾을 수 없습니다..");
    }
};
