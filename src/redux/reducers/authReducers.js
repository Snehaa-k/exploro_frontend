import { createSlice } from '@reduxjs/toolkit';
import { registerUser, verifyOtp,loginUser,fetchLeaders,fetchTravellers,createTrip,updateTrip } from '../actions/authActions';



const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    refreshToken: null,
    leaders: [],
    travellers: [],
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      console.log(state.error)
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user,"haiii redux")
    },
    setTokens: (state, action) => {
      const { access, refresh } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
      // console.log(access, "settoken");
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
    },
    setAdminToken: (state, action) => {
      const { access, refresh } = action.payload;
      state.accessToken = access;
      state.refreshToken = refresh;
     
      localStorage.setItem('admin_accessToken', access);
      localStorage.setItem('admin_refreshToken', refresh);
    },
    
    setLeaders: (state, action) => { 
      state.leaders = action.payload;
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    logoutAdmin: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem('admin_accessToken');
      localStorage.removeItem('admin_refreshToken');
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   const { accessToken, refreshToken, user } = action.payload;
      //   state.accessToken = accessToken;
      //   state.refreshToken = refreshToken;
      //   state.user = user;
      //   console.log(accessToken)
      //   localStorage.setItem('accessToken', accessToken);
      //   localStorage.setItem('refreshToken', refreshToken);
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })
      
      // .addCase(refreshAccessToken.pending, (state) => {
      //   state.isLoading = true;
        
        
      // })
      // .addCase(refreshAccessToken.fulfilled, (state, action) => {
       
      //   state.isLoading = false;
      //   state.accessToken = action.payload.accessToken;
        
      //   localStorage.setItem('accessToken', action.payload.accessToken);
      // })
      // .addCase(refreshAccessToken.rejected, (state, action) => {
       
        
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })
      .addCase(fetchLeaders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLeaders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaders = action.payload; 
      })
      .addCase(fetchLeaders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTravellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTravellers.fulfilled, (state, action) => {
        state.travellers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTravellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTrip.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateTrip.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(updateTrip.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });


  },
});

export const { startLoading, stopLoading, setError, setUser,setTokens ,setLeaders,logoutUser,setAdminToken} = userSlice.actions;
export default userSlice.reducer;
