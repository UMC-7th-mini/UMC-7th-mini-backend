import HttpException from "../../middlewares/errorHandler.js";

export const UserDTO = {
  id: "string",
  name: "string",
};

// 입력 유효성 검사 함수
export const validateUserInput = data => {

  // data.id 가 문제
  if (typeof data !== UserDTO.id) {
    throw new HttpException(
      400,
      "Invalid input data. ID and name must be strings."
    );
  }
};

// 반환 유효성 검사 함수
export const validateUserOutput = data => {
  if (typeof data.id !== UserDTO.id) {
    throw new HttpException(
      400,
      "Invalid output data. ID and name must be strings."
    );
  }
};
