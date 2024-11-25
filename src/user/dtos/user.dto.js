export const UserDTO = {
  id: "string",
  name: "string",
};

// 입력 유효성 검사 함수
export const validateUserInput = data => {
  if (typeof data.id !== UserDTO.id || typeof data.name !== UserDTO.name) {
    throw new HttpException(
      400,
      "Invalid input data. ID and name must be strings."
    );
  }
};

// 반환 유효성 검사 함수
export const validateUserOutput = data => {
  if (typeof data.id !== UserDTO.id || typeof data.name !== UserDTO.name) {
    throw new HttpException(
      400,
      "Invalid output data. ID and name must be strings."
    );
  }
};
