import signRepository from "./sign.repository.js"; // Default Import
import { validateSignUpData } from "../dtos/signup.dto.js";

const signUpService = async user => {
  try {
    // 유효성 검사

    /*const errors = validateSignUpData(user);

    if (errors.length > 0) {
      throw new HttpException(400, errors.join(","));
    }
    */
    // 유효성 통과 후 리포지토리 함수 호출
    const userdata = await signRepository.signUpRepository(user);
    return userdata;
  } catch (error) {
    console.error(`Error signup: ${error.message}`);
  }
};

const signUpDuplicateService = async id => {
  try {
    return await signRepository.duplicateRepository(id);
  } catch (error) {
    console.error(`Error duplicate: ${error.message}`);
  }
};

const signOutService = async id => {
  try {
    return await signRepository.signOutRepository(id);
  } catch (error) {
    console.error(`Error delete: ${error.message}`);
  }
};

// Default Export로 서비스 객체 내보내기
export default {
  signUpService,
  signUpDuplicateService,
  signOutService,
};
