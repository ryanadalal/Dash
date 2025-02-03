import axios from "axios";

const USER_API_BASE_URL = "http://localhost:5000";

const user_api = axios.create({
  baseURL: USER_API_BASE_URL,
  withCredentials: true,
});

export const registerUser = async (email: string, password: string) => {
  return user_api.post("/auth/register", {
    email,
    password,
  });
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await user_api.post("/auth/login", { email, password });
    if (response.data.success) {
      window.location.href = "/oauth/callback";
    }
  } catch (error: any) {
    console.error(
      "login failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const getUserData = () => {
  return user_api.get("/protected/callback/success");
};
