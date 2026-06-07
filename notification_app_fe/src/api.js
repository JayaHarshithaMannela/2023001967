import axios from "axios";

const API_BASE = "http://localhost:5000";

export const getNotifications = async () => {
  const response = await axios.get(`${API_BASE}/api/notifications`);
  return response.data;
};
