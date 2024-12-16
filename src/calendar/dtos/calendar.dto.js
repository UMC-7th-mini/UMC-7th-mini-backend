
// 개인 캘린더 조회 요청 DTO
export const GetPrivateCalendarDto = (body) => ({
    userKey: body.userKey,
    year: body.year,
    month: body.month,
});
  
// 개인 캘린더 조회 응답 DTO
export const GetPrivateCalendarResponseDto = (data) => ({
    privateCalendarKey : data.privateCalendarKey,
    userKey: data.userKey,
    year: data.year,
    month: data.month,
    data: Array.isArray(data.data) ? data.data.map(item => ({
        calendarDate: item.date,
        memos: Array.isArray(item.memos) ? item.memos.map(memo => ({
            memoKey: memo.memoKey,
            memo: memo.memo,
        })) : [], 
        schedules: Array.isArray(item.schedules) ? item.schedules.map(schedule => ({
            scheduleKey: schedule.scheduleKey,
            schedule: schedule.content,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
        })) : [], 
    })) : [],
    previousDates: data.previousDates,
    nextDates: data.nextDates,
});
  
// 날짜별 메모 및 일정 데이터
export const CalendarData = (calendarDate, memos, schedules) => ({
    calendarDate,
    memos,
    schedules,
});
  
// 메모 데이터
export const Memo = (memoKey, memo) => ({
    memoKey,
    memo,
});
  
// 일정 데이터
export const Schedule = (scheduleKey, schedule, startDate, endDate) => ({
    scheduleKey,
    schedule,
    startDate,
    endDate,
});
  
// 개인 메모 추가 DTO
export const CreateMemoDto = (body) => ({
    userKey: body.userKey,
    calendarDate: body.calendarDate, 
    memo: body.memo,
    memoName: body.memoName, //figma에는 없음 
    projectKey: body.projectKey,
});
  
// 개인 메모 추가 응답 DTO
export const CreateMemoResponseDto = (data) => ({
    memoKey: data.memoKey,
    userKey: data.userKey,
    calendarDate: data.calendarDate,
    memo: data.memo,
});

// 개인 메모 조회 DTO
export const GetMemoDto = (body) => ({
    userKey: body.userKey,
    calendarDate: body.calendarDate,
});
  
// 개인 메모 조회 응답 DTO
export const GetMemoResponseDto = (data) => ({
    userKey: data.userKey,
    calendarDate: data.calendarDate,
    memos: data.memos.map(memo => ({
      memoKey: memo.memoKey,
      memo: memo.memo,
    })),
});
  
// 개인 메모 삭제 DTO
export const DeleteMemoDto = (body) => ({
    userKey: body.userKey,
    calendarDate: body.calendarDate,
    memoKey: body.memoKey,
});
  
// 개인 메모 삭제 응답 DTO
export const DeleteMemoResponseDto = (data) => ({
    message: "메모가 성공적으로 삭제되었습니다.",
    memoKey: data.memoKey,
});
  
// 개인 일정 추가 DTO
export const CreateScheduleDto = (body) => ({
    userKey: body.userKey,
    startDate: body.startDate,
    endDate: body.endDate,
    schedule: body.schedule,
});
  
// 개인 일정 추가 응답 DTO
export const CreateScheduleResponseDto = (data) => ({
    scheduleKey: data.scheduleKey,
    userKey: data.userKey,
    startDate: data.startDate,
    endDate: data.endDate,
    schedule: data.schedule,
});

// 개인 일정 조회 요청 DTO
export const GetPrivateScheduleDto = (body) => ({
    userKey: body.userKey,
    scheduleKey: body.scheduleKey,
});
  
// 개인 일정 조회 응답 DTO
export const GetPrivateScheduleResponseDto = (data) => ({
    userKey: data.userKey,
    scheduleKey: data.scheduleKey,
    startDate: data.startDate,
    endDate: data.endDate,
    schedule: data.schedule,
});

// 개인 일정 삭제 DTO
export const DeleteScheduleDto = (body) => ({
    userKey: body.userKey,
    scheduleKey: body.scheduleKey,
    calendarDate: body.calendarDate,
});
  
// 개인 일정 삭제 응답 DTO
export const DeleteScheduleResponseDto = (data) => ({
    message: "일정이 성공적으로 삭제되었습니다.",
    scheduleKey: data.scheduleKey,
});

// 프로젝트 정보 조회 요청 DTO
export const GetProjectInfoRequestDto = (body) => ({
    projectKey: body.projectKey, 
    
});

// 프로젝트 정보 조회 응답 DTO
export const GetProjectInfoResponseDto = (data) => ({
    projectInfoKey: data.projectInfoKey, 
    projectKey: data.projectKey, 
    userKey: data.userKey, 
    projectName: data.project.projectName, 
    startDate: data.project.startDate, 
    endDate: data.project.endDate, 
    totalPeople : data.totalPeople,
    plantStatus : data.plantStatus,
});
