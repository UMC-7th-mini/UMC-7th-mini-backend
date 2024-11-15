// middlewares/errorHandler.js

export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "요청하신 경로를 찾을 수 없습니다.",
    });
  };
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // 서버 측 오류 로그 출력
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "서버 내부 오류가 발생했습니다.",
    });
  };
  
  class HttpException extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export default HttpException;
  