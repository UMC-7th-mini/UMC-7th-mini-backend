import logRepository from "./log.repository.js";

const login = async () => {
  return await logRepository.login();
};

const logout = async id => {
  return await logRepository.logout(id);
};

export default {
  login,
  logout,
};
