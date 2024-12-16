/*
// 개인 캘린더 조회 요청 DTO
export const GetPrivateCalendarDto = (body) => ({
    userKey: body.userKey,
    year: body.year,
    month: body.month,
});
*/

const calculateCalendarRange = (year, month) => {
    if (isNaN(year) || isNaN(month)) {
        throw new Error("유효하지 않은 연도 또는 월입니다.");
    }
    const firstDayOfMonth = new Date(year, month, 1); 
    const startDay = new Date(firstDayOfMonth); 
    startDay.setDate(1 - firstDayOfMonth.getDay()); 

    const lastDayOfMonth = new Date(year, month + 1, 0); 
    const endDay = new Date(lastDayOfMonth); 
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())); 

    return { startDay, endDay };
};

const generateAdditionalDates = (startDay, endDay, numDays = 5) => {
    const previousDates = [];
    const nextDates = [];

    // 이전 날짜 범위
    for (let i = 1; i <= numDays; i++) {
        const previousDate = new Date(startDay);
        previousDate.setDate(startDay.getDate() - i);
        previousDates.unshift(previousDate.toISOString().split("T")[0]); 
    }

    // 다음 날짜 범위
    for (let i = 1; i <= numDays; i++) {
        const nextDate = new Date(endDay);
        nextDate.setDate(endDay.getDate() + i);
        nextDates.push(nextDate.toISOString().split("T")[0]); 
    }

    return { previousDates, nextDates };
};


// 개인 캘린더 조회 응답 DTO -> 수정 
export const GetPrivateCalendarResponseDto = (data) => {
    if (!data.year || !data.month) {
        throw new Error("유효하지 않은 연도 또는 월입니다.");
    }

    const { startDay, endDay } = calculateCalendarRange(data.year, data.month - 1); // month는 0부터 시작
    const { previousDates, nextDates } = generateAdditionalDates(startDay, endDay);
    
    return {
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
                ndDate: schedule.endDate,
            })) : [], 
        })) : [],
        previousDates, 
        nextDates, 
    };
};
  
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


// 개인 메모 추가 요청 DTO
export const CreateMemoDto = (data) => ({
    privateCalKey: data.privateCalKey,
    scheduleKey: data.scheduleKey, 
    content: data.content,
});


// 개인 메모 추가 응답 DTO
export const CreateMemoResponseDto = (data) => ({
    memoKey: data.memoKey,
    privateCalKey: data.privateCalKey,
    content: data.content,
});

/*
// 개인 메모 조회 요청 DTO
export const GetMemoDto = (body) => ({
    userKey: body.userKey,
    calendarDate: body.calendarDate,
});
*/

// 개인 메모 조회 응답 DTO
export const GetMemoResponseDto = (data) => ({
    privateCalKey: data.privateCalKey,
    calendarDate: data.calendarDate,
    memos: data.memos.map(memo => ({
      memoKey: memo.memoKey,
      content: memo.content,
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


/*
// 개인 일정 조회 요청 DTO
export const GetPrivateScheduleDto = (body) => ({
    userKey: body.userKey,
    scheduleKey: body.scheduleKey,
});
*/
  
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

/*
// 프로젝트 정보 조회 요청 DTO
export const GetProjectInfoRequestDto = (body) => ({
    projectKey: body.projectKey, 
    
});
*/

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

// 프로젝트 캘린더 조회 응답 DTO
export const GetProjectCalendarResponseDto = (data) => {
    if (!data.year || !data.month) {
        throw new Error("유효하지 않은 연도 또는 월입니다.");
    }

    const { startDay, endDay } = calculateCalendarRange(data.year, data.month - 1); // month는 0부터 시작
    const { previousDates, nextDates } = generateAdditionalDates(startDay, endDay);

    return {
        projectKey : data.projectKey,
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
        previousDates,
        nextDates,
    }
};
    

// 프로젝트 메모 추가 응답 DTO
export const CreateProjectMemoResponseDto = (data) => ({
    memoKey: data.memoKey,
    projectCalKey : data.projectCalKey,
    content: data.content,
});

// 프로젝트 메모 조회 응답 DTO
export const GetProjectMemoResponseDto = (data) => ({
    userKey: data.userKey,
    projectKey : data.projectKey,
    calendarDate: data.calendarDate,
    memos: data.memos.map(memo => ({
      memoKey: memo.memoKey,
      memo: memo.memo,
    })),
});

// 프로젝트 메모 삭제 DTO
export const DeleteProjectMemoDto = (body) => ({
    userKey: body.userKey,
    projectKey : body.projectKey,
    calendarDate: body.calendarDate,
    memoKey: body.memoKey,
});
  
// 프로젝트 메모 삭제 응답 DTO
export const DeleteProjectMemoResponseDto = (data) => ({
    message: "메모가 성공적으로 삭제되었습니다.",
    memoKey: data.memoKey,
});

// 프로젝트 일정 추가 응답 DTO
export const CreateProjectScheduleResponseDto = (data) => ({
    scheduleKey: data.scheduleKey,
    projectKey : data.projectKey,
    userKey: data.userKey,
    startDate: data.startDate,
    endDate: data.endDate,
    schedule: data.schedule,
});

// 프로젝트 일정 추가 DTO
export const CreateProjectScheduleDto = (body) => ({
    projectKey: body.projectKey,
    userKey: body.userKey,
    startDate: body.startDate,
    endDate: body.endDate,
    schedule: body.schedule,
});

// 프로젝트 일정 조회 응답 DTO
export const GetProjectScheduleResponseDto = (data) => ({
    userKey: data.userKey,
    projectKey : data.projectKey,
    scheduleKey: data.scheduleKey,
    startDate: data.startDate,
    endDate: data.endDate,
    schedule: data.schedule,
});

// 프로젝트 일정 삭제 DTO
export const DeleteProjectScheduleDto = (body) => ({
    userKey: body.userKey,
    scheduleKey: body.scheduleKey,
    calendarDate: body.calendarDate,
});
  
// 프로젝트 일정 삭제 응답 DTO
export const DeleteProjectScheduleResponseDto = (data) => ({
    message: "일정이 성공적으로 삭제되었습니다.",
    scheduleKey: data.scheduleKey,
});