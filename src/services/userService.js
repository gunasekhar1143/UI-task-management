import api from "./api";

export const registerUser = async (userData) => {
  return await api.post("/users/register", userData);
};

export const loginUser = async (loginData) => {
  return await api.post("/users/login", loginData);
};

export const getAllUsers = async () => {
  return await api.get("/users");
};

export const deleteUser = async (id) => {
  return await api.delete(`/users/delete/${id}`);
};

export const getUserById = async (id) => {
  return await api.get(`/users/${id}`);
};


export const updateUser = async (id, userData) => {
  return await api.put(`/users/update/${id}`, userData);
};
