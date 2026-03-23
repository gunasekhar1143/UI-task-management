import api from "./api";

export const getNotificationsByUserId = async (userId) => {
  return await api.get(`/notifications/${userId}`);
};

export const updateStatus = async (id) => {
  return await api.put(`/notifications/read/${id}`);
};