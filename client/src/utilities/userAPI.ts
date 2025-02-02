import axios from "axios";

const USER_API_BASE_URL = "http://localhost:5000";

const user_api = axios.create({
  baseURL: USER_API_BASE_URL,
  withCredentials: true,
});

export const registerUser = async (email: String, password: String) => {
  return user_api.post(`${USER_API_BASE_URL}/register`, { email, password });
};

export const loginUser = async (email: String, password: String) => {
  return user_api.post(`${USER_API_BASE_URL}/login`, { email, password });
};

export const getUserData = () => {
  return user_api.get(`${USER_API_BASE_URL}/protected/callback/success`);
};
