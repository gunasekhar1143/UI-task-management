import api from "./api";

export const getAllProjects = async () => {
  return await api.get("/projects");
};

export const getProjectById = async (id) => {
  return await api.get(`/projects/${id}`);
};

export const createProject = async (projectData) => {
  return await api.post("/projects", projectData);
};

export const updateProject = async (id, projectData) => {
  return await api.put(`/projects/${id}`, projectData);
};

export const deleteProject = async (id) => {
  return await api.delete(`/projects/${id}`);
};

export const getAllUsers = async () => {
  return await api.get("/users");
};

export const assignUserToProject = async (projectId, userId) => {
  return await api.post(`/projects/${projectId}/assign/${userId}`);
};

export const getProjectMembers = async (projectId) => {
    return await api.get(`/projects/${projectId}/members`);
};

export const getProjectsByUserId = (userId) => {
  return api.get(`/projects/user/${userId}`);
};