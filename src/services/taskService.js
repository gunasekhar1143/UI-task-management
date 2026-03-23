import api from "./api";

/* CREATE TASK */
export const createTask = (task) => {
  return api.post("/tasks", task);
};

/* GET TASK BY ID */
export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`);
};

/* GET ALL TASKS */
export const getAllTasks = () => {
  return api.get("/tasks");
};

/* UPDATE TASK */
export const updateTask = (id, task) => {
  return api.put(`/tasks/${id}`, task);
};

/* DELETE TASK */
export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

/* GET TASKS BY PROJECT */
export const getTasksByProjectId = (projectId) => {
  return api.get(`/tasks/project/${projectId}`);
};

/* GET TASKS BY USER */
export const getTasksByUserId = (userId) => {
  return api.get(`/tasks/user/${userId}`);
};

/* GET TASKS BY PROJECT + USER */
export const getTasksByProjectAndUser = (projectId, userId) => {
  return api.get(`/tasks/project/${projectId}/user/${userId}`);
};