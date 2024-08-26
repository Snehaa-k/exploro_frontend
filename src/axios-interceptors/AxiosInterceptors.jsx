import axios from 'axios';
import store from '../redux/store/store';
import { logoutUser, setTokens } from '../redux/reducers/authReducers';

const token = localStorage.getItem("accessToken");
console.log("in intercepter",token );



const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Authorization': `Bearer ${token}`
  }

});
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return new Promise(() => {});
  }
);


// api.interceptors.request.use((config) => {
//   const state = store.getState();
//   // console.log(state.user.access,"my token");
  
//   // const accessToken = state.user.accessToken || localStorage.getItem('accessToken');


//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// }, (error) => {
//   console.log("asjdhbfasdf");
  
//   return Promise.reject(error);
// });


// Response interceptor for handling token refresh
// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("I am working inside of the error statement");
     
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Attempting to refresh token");
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("Refresh token:", refreshToken);
        
        await refreshAccessToken(refreshToken, "user", originalRequest);
        
        // The original request will be retried in the refreshAccessToken function
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Optionally, you can log out the user here
        // store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }

    return new Promise(() => {});

  }
);

// Function to refresh the access token
async function refreshAccessToken(refreshToken, user, originalRequest) {
  try {
    const response = await api.post('/token/refresh/', { refresh: refreshToken });
    
    // Save the new tokens to localStorage
    if (user === "user") {
      localStorage.setItem('accessToken', response.data.access);
      api.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
      originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
      return  api(originalRequest);
  } 
}catch (error) {
    console.error("Error refreshing token:", error);
    // Optionally, you can log out the user here
    // store.dispatch(logoutUser());
    throw error; // Rethrow the error to be caught in the interceptor
  }
}

export default api;
