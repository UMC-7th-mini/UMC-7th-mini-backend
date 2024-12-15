import { StatusCodes } from 'http-status-codes'; 
import dayjs from 'dayjs';

import * as CalendarDto from "./dtos/calendar.dto.js";
import * as CalendarService from "./calendar.service.js"


//개인 캘린더 조회
export const getPrivateCalendarController = async (req,res, next) => {
    try {
        const userKey = parseInt(req.params.userKey);
        const calendars = await CalendarService.getPrivateCalendarService(userKey);
        return res.status(StatusCodes.OK).success(calendars);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
    }
}


//개인 메모 추가
export const addPrivateCalendarMemoController = async (req,res, next) => {
    const userKey = req.params.userKey;
    const { calendarDate, memo, memoName, projectKey } = req.body;
    console.log("data : ", req.body);

    const formattedDate = dayjs(calendarDate).toISOString();

    const newMemo = await CalendarService.createPrivateMemoService({
        userKey, 
        calendarDate: formattedDate, 
        memo, 
        memoName,
        projectKey,
    });
    const privateCalendarKey = newMemo.privateCalendarKey;
    const privateMemo = await calendarRepository.getPrivateMemo(privateCalendarKey); 

    res.status(StatusCodes.OK).json({ result: privateMemo });
}

//개인 메모 조회
export const getPrivateCalendarMemoController = async (req,res, next) => {
    try {
        const privateCalendarKey = parseInt(req.params.privateCalendarKey); 
        const memos = await CalendarService.getPrivateMemoService(privateCalendarKey);
        res.status(StatusCodes.OK).json(memos);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
    }
}

//개인 메모 삭제
export const deletePrivateCalendarMemoController = async (req,res, next) => {
    try {
        const userKey = parseInt(req.params.userKey);
        const { memoKey, calendarDate } = req.body; 

        const result = await CalendarService.deletePrivateMemoService(userKey, memoKey, calendarDate);
        
        if (result) {
            res.status(StatusCodes.OK).json({ message: "메모가 성공적으로 삭제되었습니다.", memoKey });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "메모를 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
    }
}


//개인 일정 추가
export const addPrivateScheduleController = async (req,res, next) => {
    console.log("data : ", req.body);

    const newSchedule = await CalendarService.createPrivateScheduleService(CalendarDto.CreateScheduleDto(req.body));
    res.status(StatusCodes.OK).json({result: newSchedule });
}

//개인 일정 조회
export const getPrivateCalendarScheduleController = async (req,res, next) => {
    try {
        const userKey = parseInt(req.params.userKey);
        const schedules = await CalendarService.getPrivateScheduleService(userKey);
        res.status(StatusCodes.OK).success(schedules);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
    }
}

//개인 일정 삭제
export const deletePrivateCalendarScheduleController = async (req, res, next) => {
    try {
        const userKey = parseInt(req.params.userKey);
        const { scheduleKey, calendarDate } = req.body; 

        const result = await CalendarService.deletePrivateScheduleService(userKey, scheduleKey, calendarDate);
        
        if (result) {
            res.status(StatusCodes.OK).json({ message: "일정이 성공적으로 삭제되었습니다.", scheduleKey });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "일정을 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
    }
}


//프로젝트 정보 조회
export const getProjectInfoController = async (req,res, next) => {
    try {
        const projectKey = parseInt(req.params.projectKey);
        const projectInfos = await CalendarService.getProjectInfoService(projectKey);
        res.status(StatusCodes.OK).success(projectInfos);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류가 발생했습니다." });
    }
};
