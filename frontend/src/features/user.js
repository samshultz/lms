import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'



export const register = createAsyncThunk(
    "users/register",
    async (postData, { rejectWithValue }) => {
        try {
            const res = await axios.post("/auth/register", postData).then((response) => response)
            return res
        } catch(err) {
            if(err.response) return rejectWithValue(err.response.data)
            return rejectWithValue("Oops there seem to be an error")
        }
      
    }
  );

  export const getUser = createAsyncThunk(
      "users/getUser",
      async (h="", { rejectWithValue }) => {
          try {
              const res = await axios.get("/user").then((resp) => resp)
              return res
          } catch(err) {
              if(err.response) return rejectWithValue(err.response)
              return rejectWithValue("Oops there seem to be an error")
          }
      }
  )


  export const login = createAsyncThunk(
    "users/login",
    async (postData, { rejectWithValue }) => {

        try {
            const res = await axios.post(
                "/auth/login", 
                postData).then((response)=> response)
                
                return res
        } catch(err) {
            if(err.response) return rejectWithValue(err.response.data)
            return rejectWithValue("Oops there seem to be an error")
        }
      
    }
  );


export const userSlice = createSlice({
    name: "user",
    initialState: { status: 0, accessToken: "", loading: false, user: {}, errMessage: "" },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        getAccessToken: (state) => {
            return state
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.loading = true
        },
        [register.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload            
            state.accessToken = payload.data.user.token
        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.status
            state.errMessage = action.payload
        },
        [login.pending]: (state) => {
            state.loading = true
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.data
            console.log(payload)
            state.status = payload.status
            state.accessToken = payload.data.token
        },
        [login.rejected]: (state, {payload}) => {
            state.loading = false
            console.log(payload)
            state.status = payload.status
            state.errMessage = payload
        },
        [getUser.pending]: (state) => {
            state.loading = true
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            if(payload.data) {
                state.user = payload.data
                state.status = payload.status
                state.accessToken = payload.data.token
            } else {
                state.errMessage = payload.message
            }
            
        },
        [getUser.rejected]: (state, {payload}) => {
            state.loading = false
            state.status = payload.status

            state.errMessage = payload.data.message
        },

    }
})

export  const { setAccessToken, getAccessToken } = userSlice.actions
export default userSlice.reducer