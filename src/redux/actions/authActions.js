import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService, { API_URL } from '../../apiservice/Apiservice';
import api from '../../axios-interceptors/AxiosInterceptors';
import userApi from '../../axios-interceptors/AxiosInterceptors';


export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await apiService.createUser(userData);
        console.log(response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


export const verifyOtp = createAsyncThunk(
    'user/verifyOtp',
    async (otpData, { rejectWithValue }) => {
      try {
        
        const response = await apiService.verifyOtp(otpData);
        console.log(response.data,"haii action")
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


 
export const sendOTP = createAsyncThunk(
  'user/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await apiService.sendOTP(email);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


  
  export const selectRole = createAsyncThunk(
    'user/selectRole',
    async (roleData, { rejectWithValue }) => {
      try {
        const response = await apiService.selectRole(roleData);
        console.log(response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  export const preferenseSelection = createAsyncThunk(
    'user/preference',
    async (preferenceData, { rejectWithValue }) => {
      try {
        const response = await apiService.preferenseSelection(preferenceData);
        console.log(response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await apiService.login(credentials);
        const { access, refresh, user } = response.data;
        console.log(access)
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        return { access, refresh, user };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const loginAdmin = createAsyncThunk(
    'user/loginAdmin',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await apiService.login(credentials);
        const { access, refresh, user } = response.data;
        console.log(access)
        localStorage.setItem('admin_accessToken', access);
        localStorage.setItem('admin_refreshToken', refresh);
        return { access, refresh, user };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  
  
  
  


  
  export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        Object.keys(profileData).forEach(key => {
          if (profileData[key] !== undefined && profileData[key] !== null) {
            formData.append(key, profileData[key]);
          }
        });
  
        const response = await axios.put('http://localhost:8000/profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

//form submission for travel leader
export const FromSubmit = createAsyncThunk(
  'user/formsubmit',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiService.formsubmission(formData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//fecth travel leaders
export const fetchLeaders = createAsyncThunk(
  'user/fetchLeaders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getLeaders(); 
      console.log(response.data);
       
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);


export const fetchTravellers = createAsyncThunk(
  'user/fetchTravellers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getTravellers(); 
      console.log(response.data);
       
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);



export const createTrip = createAsyncThunk(
  'user/createTrip',
  async (userData, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/createtrip/', userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
     
      console.log("haii",error);
      
    //  throw error

    return rejectWithValue(error);
    }
  }
);

export const createPosts = createAsyncThunk(
  'user/createPosts',
  async (userData, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/posts/', userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
     
      return rejectWithValue(error.response.data);
    }
  }
);


export const createarticle = createAsyncThunk(
  'user/createarticle',
  async (userData, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/article/', userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
     
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateTrip = createAsyncThunk(
  'trips/updateTrip',
  async ({  updatedTrip }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/updatetrip/`, updatedTrip);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePlaces = createAsyncThunk(
  'trips/',
  async ({  updatePlaces }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/editplaces/`, updatePlaces);
      console.log(response.data,"my places")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchuser = createAsyncThunk(
  'user/fetchuser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/viewusers/')
      console.log(response.data);
       
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);



// export const forgotpassword = createAsyncThunk(
//   '/forgotpassword',
//   async ({  forgot }, { rejectWithValue }) => {
//     try {
//       const response = await apiService.forgot(forgot);
//       console.log(response.data,"my places")
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


export const forgotpassword = createAsyncThunk(
  'user/forgot',
  async (preferenceData, { rejectWithValue }) => {
    try {
      const response = await apiService.forgot(preferenceData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetpassword = createAsyncThunk(
  'user/forgot',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService.resetpasword(data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);







export const logoutadmin = () => {
  localStorage.removeItem('admin_access_token');
  localStorage.removeItem('admin_refresh_token');
  return { type: 'LOGOUT' };
};







// export const logoutUser = () => {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
//   return { type: 'LOGOUT' };
// };


  

// export const resendOtp = createAsyncThunk(
//   'user/resendOtp',
//    async(otpData,{rejectWithValue})=>{
//     try{
//       const response = await apiService.resendOtp(otpData);
//       return response.data;


//     }catch (error) {
//       return rejectWithValue(error.response.data);
//     }

//    }
// );