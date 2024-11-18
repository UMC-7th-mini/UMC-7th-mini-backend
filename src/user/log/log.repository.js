const login = async () => {
  // 로그인 로직 (예제 데이터 반환)
  return { message: "User logged in successfully" };
};

const logout = async (id) => {
  // 로그아웃 로직 (예제 데이터 반환)
  return { message: `User with ID ${id} logged out successfully` };
};

export default {
  login,
  logout,
};
