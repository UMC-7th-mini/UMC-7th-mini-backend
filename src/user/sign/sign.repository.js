const signUpRepository = async signUpData => {
  // 예제 데이터
  return { id: 1, ...signUpData };
};

const duplicateRepository = async id => {
  // 중복 확인 예제 로직
  return id === "duplicate";
};

const signOutRepository = async id => {
  return { id, message: "Signed out successfully" };
};

// Default Export로 객체 내보내기
export default {
  signUpRepository,
  duplicateRepository,
  signOutRepository,
};
