export const signUpDTO = {
  userId: "string",
  userName: "string",
  userPassword: "string",
  userEmail: "string",
  gender: ["MALE", "FEMALE"],
  birth: "date",
};

export const validateSignUpData = (data, signUpDTO) => {
  const errors = [];

  Object.entries(signUpDTO).forEach(([key, type]) => {
    const value = data[key];

    // 데이터 입력 여부 확인
    if (value === undefined || value === null || value === "") {
      errors.push(`${key} is required.`);
      return;
    }

    // 데이터 타입 확인
    if (type === "string" && typeof value !== "string") {
      errors.push(`${key} must be a string.`);
      return;
    }

    if (type === "date") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.\d{3}Z)?$/;
      const date = new Date(value);

      if (!dateRegex.test(value)) {
        errors.push(`${key} must be in the format YYYY-MM-DD or ISO 8601.`);
      }

      if (isNaN(date.getTime())) {
        errors.push(`${key} must be a valid date.`);
      }
      return;
    }

    // 배열 타입 (gender와 같이 배열에 정의된 값 체크)
    if (Array.isArray(type) && !type.includes(value)) {
      errors.push(`${key} must be one of ${type.join(", ")}.`);
      return;
    }

    // 특정 필드 조건
    if (key === "userEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push(`${key} must be a valid email address.`);
      }
      return;
    }

    if (key === "userName") {
      const nameRegex = /^.{3,50}$/; // 이름 길이를 3~50자로 제한
      if (!nameRegex.test(value)) {
        errors.push(`${key} must be between 3 and 50 characters.`);
      }
      return;
    }
  });

  console.log("dtoError", errors);
  return errors;
};

