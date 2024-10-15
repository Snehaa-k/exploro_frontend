import axios from "axios";
import store from "../redux/store/store";
import { logoutUser, setTokens } from "../redux/reducers/authReducers";

const token = localStorage.getItem("accessToken");
console.log("in intercepter", token);

const api = axios.create({
  baseURL: "http://16.170.202.50",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return new Promise(() => {});
  },
);

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Attempting to refresh token");

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Refresh token:", refreshToken);

        await refreshAccessToken(refreshToken, "user", originalRequest);

        // Retry the original request after refreshing the token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Dispatch a logout action
        store.dispatch(logoutUser());

        // Optionally redirect the user to the login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // return new Promise(() => {});
    return Promise.reject(error.response ? error.response.data : error.message);
  },
);

// Function to refresh the access token
async function refreshAccessToken(refreshToken, user, originalRequest) {
  try {
    const response = await api.post("/token/refresh/", {
      refresh: refreshToken,
    });

    // Save the new tokens to localStorage
    if (user === "user") {
      localStorage.setItem("accessToken", response.data.access);
      api.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
      originalRequest.headers["Authorization"] =
        `Bearer ${response.data.access}`;
      return api(originalRequest);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Optionally, you can log out the user here

    throw error; // Rethrow the error to be caught in the interceptor
  }
}

export default api;
