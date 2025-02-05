import axios from "axios";

const USER_API_BASE_URL = "http://localhost:5000";

const user_api = axios.create({
  baseURL: USER_API_BASE_URL,
  withCredentials: true,
});

/**
 * Register the user with their credentials
 * 1. send the data to the backend to try creating a new account
 * 2. redirect to login page on successful login
 * 3. on a failure log the error and throw it
 * @param email
 * @param password
 */
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await user_api.post("/auth/register", {
      email,
      password,
    });
    if (response.data.success) {
      window.location.href = "/login";
    }
  } catch (error: any) {
    console.error("register failed:", error.message);
    throw error;
  }
};

/**
 * Login the user with their provided crednetials
 * 1. send the credentials to the backend for verification
 * 2. if successful redirect to the oauth callback to get the full user data
 * 3. if failiure log and throw the error
 * @param email
 * @param password
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await user_api.post("/auth/login", { email, password });
    if (response.data.success) {
      window.location.href = "/oauth/callback?update=false";
    }
  } catch (error: any) {
    console.error("login failed:", error.message);
    throw error;
  }
};
/**
 * Fetch user data using the backends fetch route
 * @returns the user data from the backend
 */
export const getUserData = () => {
  return user_api.get("/protected/callback/success");
};

/**
 * Finish signing up the user
 * 1. send the data to the backend to try filling in the new account
 * 2. redirect to home page on successful login
 * 3. on a failure log the error and throw it
 * @param email
 * @param password
 */
export const completeRegisterUser = async (
  firstName: string,
  lastName: string,
  birthDate: Date
) => {
  try {
    const response = await user_api.post("/protected/completeregister", {
      firstName,
      lastName,
      birthDate,
    });
    if (response.data.success) {
      window.location.href = "/oauth/callback?update=true";
    }
  } catch (error: any) {
    console.error("completion of registration process failed:", error.message);
    throw error;
  }
};
