import signRepository from "./sign.repository.js"; // Default Import

const signUpService = async signUpData => {
  return await signRepository.signUpRepository(signUpData);
};

const signUpDuplicateService = async id => {
  return await signRepository.duplicateRepository(id);
};

const signOutService = async id => {
  return await signRepository.signOutRepository(id);
};

// Default Export로 서비스 객체 내보내기
export default {
  signUpService,
  signUpDuplicateService,
  signOutService,
};
