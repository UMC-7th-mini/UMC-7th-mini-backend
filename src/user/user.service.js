import userRepository from "./user.repository.js";

const getUserById = async id => {
  return await userRepository.findUserById(id);
};

export default {
  getUserById,
};
