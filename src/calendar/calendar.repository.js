import { PrismaClient } from "@prisma/client";
import dayjs from 'dayjs';

const prisma = new PrismaClient();

// 개인 캘린더 조회 
export const getPrivateCalendar = async (userKey, year, month)=> {
    try {
        const startDate = dayjs(`${year}-${month}-01`).startOf('month'); 
        const endDate = dayjs(startDate).endOf('month'); 

        const privateCalendar = await prisma.PrivateCalendar.findMany({ where: { userKey: userKey, gte: startDate.toDate(), lte: endDate.toDate() } });
        return privateCalendar;
    } catch (error){
        console.error("개인 캘린더 조회 중 오류: ",error);
        throw new Error("개인 캘린더를 찾을 수 없습니다..");
    }
};

// 개인 메모 추가 - 한번 수정하기
export const addPrivateMemo = async (data) => {
    try {
        const createdMemo = await prisma.PrivateCalendar.create({
            data: {
                content: data.memo, 
                privateCalKey: data.privateCalKey, 
            }
        });
        return createdMemo;
    } catch (err) {
        console.error("메모 추가 중 오류: ", err);
        throw new Error("메모 추가 중 오류가 발생했습니다.");
    }
};

//개인 메모 조회 
export const getPrivateMemo = async (privateCalKey) => {
    try {
        const privateMemo = await prisma.PrivateCalendar.findUniqueOrThrow({
            where: { privateCalKey: privateCalKey }
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
export const getPrivateSchedule = async (scheduleKey) => {
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
        const deletedSchedule = await prisma.PrivateCalendar.deleteMany({
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

// 프로젝트 캘린더 조회 
export const getProjectCalendar = async (projectKey, year, month)=> {
    try {
        const projectCalendar = await prisma.ProjectCalendar.findMany({ where: { projectKey : projectKey, year : year, month : month } });
        return projectCalendar;
    } catch (error){
        console.error("개인 캘린더 조회 중 오류: ",error);
        throw new Error("개인 캘린더를 찾을 수 없습니다..");
    }
};

// 프로젝트 메모 추가
export const addProjectMemo = async (data) => {
    try {
        const createdMemo = await prisma.ProjectCalendar.create({
            data: {
                calendarDate: data.calendarDate,
                memos: {
                    create: {
                        content: data.memo, 
                    },
                },
                project: {
                    connect: { projectCalKey: data.projectCalKey }
                }
            }
        });
        return createdMemo;
    } catch (err) {
        console.error("메모 추가 중 오류: ", err);
        throw new Error("메모 추가 중 오류가 발생했습니다.");
    }
};

//프로젝트 메모 조회 
export const getProjectMemo = async (projectKey) => {
    try {
        if (typeof projectKey !== 'number') {
            throw new Error("projectKey는 정수여야 합니다.");
        }
        const projectMemo = await prisma.ProjectCalendar.findUniqueOrThrow({
            where: { projectKey: projectKey }
        });
        return projectMemo;
    } catch (error){
        console.error("프로젝트 캘린더 메모 조회 중 오류: ",error);
        throw new Error("프로젝트 메모를 찾을 수 없습니다..");
    }
};

// 프로젝트 메모 삭제 
export const deleteProjectMemo = async ({ projectKey, userKey, memoKey, calendarDate })=> {
    try {
        const deletedMemo = await prisma.ProjectCalendar.deleteMany({
            where: {
                projectKey : projectKey,
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

// 프로젝트 일정 추가 
export const addProjectSchedule = async (data) => {
    try {
        const createdSchedule = await prisma.ProjectCalendar.create({
          data: {
            projectKey : projectKey,
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

// 프로젝트 일정 조회 - > 수정
export const getProjectSchedule = async (scheduleKey) => {
    try {
        const projectSchedule = await prisma.ProjectCalendar.findUniqueOrThrow({ where: { ScheduleKey: scheduleKey } });
        return privateSchedule;
    } catch (error){
        console.error("프로젝트 캘린더 일정 조회 중 오류: ",error);
        throw new Error("프로젝트 일정을 찾을 수 없습니다..");
    }
};

// 프로젝트 일정 삭제 
export const deleteProjectSchedule = async ({ projectKey, userKey, scheduleKey, calendarDate }) => {
    try {
        const deletedSchedule = await prisma.ProjectCalendar.deleteMany({
            where: {
                projectKey : projectKey,
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