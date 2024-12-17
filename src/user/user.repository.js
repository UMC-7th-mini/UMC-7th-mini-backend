const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

const findUserById = async id => {
  return users.find(user => user.id === id) || null;
};

export default {
  findUserById,
};
