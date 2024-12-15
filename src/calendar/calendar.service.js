import * as calendarRepository from "./calendar.repository.js";
import * as calendarDto from "./dtos/calendar.dto.js";

// 개인 캘린더 조회
export const getPrivateCalendarService = async (privateCalendarKey) => {
    try {
        const privateCalendars = await calendarRepository.getPrivateCalendar(privateCalendarKey);
        if(!privateCalendars){
           throw new Error("개인 캘린더를 찾을 수 없습니다.");
        }
        return calendarDto.GetPrivateCalendarResponseDto(privateCalendars);
   } catch (error){
       console.error("개인 캘린더 조회 중 오류가 발생했습니다.", error);
       throw new Error("개인 캘린더 조회 중 오류가 발생했습니다.");
   }
}

// 개인 메모 추가
export const createPrivateMemoService = async (data) => {
    const createKey = await calendarRepository.addPrivateMemo({
        userKey: data.userKey,
        calendarDate: data.calendarDate,
        memo: data.memo,
        memoName: data.memoName,
        projectKey : data.projectKey,
    });
    
    if (!createKey.privateCalendarKey) {
        throw new Error("privateCalendarKey가 존재하지 않습니다.");
    }
    
    const memo = await calendarRepository.getPrivateMemo(createKey.privateCalendarKey);
    return calendarDto.CreateMemoResponseDto(memo);
}

// 개인 메모 조회
export const getPrivateMemoService = async (memoKey) => {
    try {
         const memos = await calendarRepository.getPrivateMemo(memoKey);
         if(!memos){
            throw new Error("메모를 찾을 수 없습니다.", {memoKey});
         }
         return calendarDto.GetMemosResponseDto(memos);
    } catch (error){
        console.err("메모 조회 중 오류가 발생했습니다.", error);
        throw new Error("메모 조회 중 오류가 발생했습니다.");
    }
}

// 개인 메모 삭제 
export const deletePrivateMemoService = async (data) => {
    try {
        const { userKey, memoKey, calendarDate } = data; 
        const result = await calendarRepository.deletePrivateMemo({ userKey, memoKey, calendarDate }); // 레포지토리 호출

        if (result) {
            return { message: "메모가 성공적으로 삭제되었습니다.", memoKey }; 
        } else {
            throw new Error("메모를 찾을 수 없습니다."); 
        }
    } catch (error) {
        console.error("메모 삭제 중 오류가 발생했습니다.", error);
        throw new Error("메모 삭제 중 오류가 발생했습니다.");
    }
}

// 개인 일정 추가
export const createPrivateScheduleService = async (data) => {
    const createKey = await calendarRepository.addPrivateSchedule({
        userKey: data.userKey,
        calendarDate: data.calendarDate,
        schedule: data.schedule,
    });
    
    const schedule = await calendarRepository.getPrivateSchedule(createKey);
    return calendarDto.CreateScheduleResponseDto(schedule);
}

// 개인 일정 조회 
export const getPrivateScheduleService = async (scheduleKey) => {
    try {
        const schedules = await calendarRepository.getPrivateMemo(scheduleKey);
        if(!schedules){
           throw new Error("일정을 찾을 수 없습니다.", {scheduleKey});
        }
        return calendarDto.GetPrivateScheduleResponseDto(schedules);
   } catch (error){
       console.err("일정 조회 중 오류가 발생했습니다.", error);
       throw new Error("일정 조회 중 오류가 발생했습니다.");
   }
}

// 개인 일정 삭제 
export const deletePrivateScheduleService = async (data) => {
    try {
        const { userKey, scheduleKey, calendarDate } = data; 
        const result = await calendarRepository.deletePrivateSchedule({ userKey, scheduleKey, calendarDate }); 

        if (result) {
            return { message: "일정이 성공적으로 삭제되었습니다.", scheduleKey }; 
        } else {
            throw new Error("일정을 찾을 수 없습니다."); 
        }
    } catch (error) {
        console.error("일정 삭제 중 오류가 발생했습니다.", error);
        throw new Error("일정 삭제 중 오류가 발생했습니다.");
    }
}

// 프로젝트 정보 조회 
export const getProjectInfoService = async (data) => {
    try {
        const projectInfos = await calendarRepository.getProjectInfo(projectKey);
        if(!projectInfos){
           throw new Error("프로젝트에 대한 정보를 찾을 수 없습니다.", {projectKey});
        }
        return calendarDto.GetProjectInfoResponseDto(projectInfos);
   } catch (error){
       console.err("프로젝트 정보 조회 중 오류가 발생했습니다.", error);
       throw new Error("프로젝트 정보 조회 중 오류가 발생했습니다.");
   }
};