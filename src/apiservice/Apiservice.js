import axios from 'axios';

export const API_URL = 'http://localhost:8000'; 

const apiService = {
  
  createUser: (userData) => axios.post(`${API_URL}/register/`, userData), 
  
  verifyOtp: (otpData) => axios.post(`${API_URL}/otpverify/`, otpData), 
  selectRole: (role) => axios.post(`${API_URL}/selectingrole/`, role), 
  preferenseSelection: (preference) => axios.post(`${API_URL}/userpreference/`, preference), 
  login: (credentials) => axios.post(`${API_URL}/login/`, credentials),
  sendOTP: (email) => axios.post(`${API_URL}/send/`, email ),
  refreshToken: (refreshToken) => axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken }), 
  formsubmission: (formData) => {
    return axios.post(`${API_URL}/formsubmission/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getLeaders : ()=> axios.get(`${API_URL}/formview/`), 
  getTravellers : ()=> axios.get(`${API_URL}/travellers/`), 
  

}

export default apiService;