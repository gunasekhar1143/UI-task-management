import api from "./api";

/* GET KANBAN BOARD BY PROJECT */
export const getKanbanBoard = (projectId) => {
  return api.get(`/kanban/project/${projectId}`);
};

/* UPDATE TASK STATUS (DRAG & DROP) */
export const updateTaskStatus = (taskId, status) => {
  return api.put(`/kanban/task/${taskId}/status`, {
    status: status
  });
};