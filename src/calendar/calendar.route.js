
import express from "express";
import * as calendarController from "./calendar.controller.js";
const calendarRouter = express.Router();


// 이 라우터는 /calendar 요청이 들어오면 실행
calendarRouter.get("/", (req, res) => {
  res.send("calendar main route");
});

// 추가 라우터 사용하기
/*calendarRouter.use("/info", (req, res) => {
  // /calendar/info - 똑같은 형식으로 사용
  res.send("calendar info route");
});
*/

//개인 캘린더 조회
calendarRouter.get("/privatecalendar/:userKey", calendarController.getPrivateCalendarController);

//개인 메모 추가
calendarRouter.post("/privatecalendar/:userKey/memo", calendarController.addPrivateCalendarMemoController);

//개인 메모 조회
calendarRouter.get("/privatecalendar/:userKey/memo", calendarController.getPrivateCalendarMemoController);

//개인 메모 삭제
calendarRouter.delete("/privatecalendar/:userKey/memo", calendarController.deletePrivateCalendarMemoController);

//개인 일정 추가
calendarRouter.post("/privatecalendar/:userKey/schedule", calendarController.addPrivateScheduleController);

//개인 일정 조회 
calendarRouter.get("/privatecalendar/:userKey/schedule", calendarController.getPrivateCalendarScheduleController);

//개인 일정 삭제 
calendarRouter.delete("/privatecalendar/:userKey/schedule", calendarController.deletePrivateCalendarScheduleController);



//프로젝트 정보 조회
calendarRouter.get("/projectcalendar/:projectKey/projectInfo", calendarController.getProjectInfoController);


/*
//프로젝트 캘린더 조회
calendarRouter.get("/calendar/projectcalendar/:projectKey", calendarController.getProjectCalendarController);

//프로젝트 캘린더에 메모 추가
calendarRouter.post("/calendar/projectcalendar/:projectKey/memo", calendarController.addProjectCalendarMemoController);

//프로젝트 메모 조회
calendarRouter.get("/calendar/projectcalendar/:projectKey/memo", calendarController.getProjectCalendarMemoController);

//프로젝트 메모 삭제
calendarRouter.delete("/calendar/projectcalendar/:projectKey/memo", calendarController.deleteProjectCalendarMemoController);

//프로젝트 일정 추가
calendarRouter.post("/calendar/projectcalendar/:projectKey/schedule", calendarController.addProjectScheduleController);

//프로젝트 일정 조회 
calendarRouter.get("/calendar/projectcalendar/:projectKey/schedule", calendarController.getProjectCalendarScheduleController);

//프로젝트 일정 삭제 
calendarRouter.delete("/calendar/projectcalendar/:projectKey/schedule", calendarController.deleteProjectCalendarScheduleController);
*/

export default calendarRouter;