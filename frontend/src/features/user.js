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
              console.log(err)
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

  export const logout = createAsyncThunk(
      "users/logout",
      async (h="", { rejectWithValue }) => {
          try {
              const res = await axios.post("/auth/logout").then((resp) => resp)
              return res
          } catch (err) {
            //   throw err
              if(err.response) return rejectWithValue(err.response.data)
              return rejectWithValue("Oops there seem to be an error")
          }
      }
  )
let initialState = { redirectToLogin: false, status: 0, accessToken: "", loading: false, user: {}, errMessage: "" }

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAccessToken: (state, {payload}) => {
            state.status = payload.status
            state.accessToken = payload.data.accessToken
        },
        getAccessToken: (state) => {
            return state.accessToken
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.loading = true
            state.redirectToLogin = false
        },
        [register.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload            
            state.accessToken = payload.data.user.token
            state.redirectToLogin = false
        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.status
            state.errMessage = action.payload
        },
        [login.pending]: (state) => {
            state.loading = true
            state.redirectToLogin = false
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.data
            console.log(payload)
            state.status = payload.status
            state.accessToken = payload.data.token
            state.redirectToLogin = false
        },
        [login.rejected]: (state, {payload}) => {
            state.loading = false
            console.log(payload)
            state.status = payload.status
            state.errMessage = payload
        },
        [logout.pending]: (state) => {
            state.loading = true
            state.redirectToLogin = false
        },
        [logout.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.status = payload.status
            state.user = {}
            state.accessToken = ""
            state.redirectToLogin = true
        },
        [logout.rejected]: (state, {payload}) => {
            state.loading = false
            console.log(payload)
            state.status = payload.status
            state.errMessage = payload
            state.redirectToLogin = false
        },
        [getUser.pending]: (state) => {
            state.loading = true
            state.redirectToLogin = false
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            if(payload.data) {
                state.user = payload.data
                state.status = payload.status
                state.accessToken = payload.data.token
                state.redirectToLogin = false
            } else {
                state.errMessage = payload.message
            }
            
        },
        [getUser.rejected]: (state, {payload}) => {
            state.loading = false
            state.status = payload.status
            console.log(payload)
            state.errMessage = payload.data.message
            state.redirectToLogin = true
        },

    }
})

export  const { setAccessToken, getAccessToken } = userSlice.actions
export default userSlice.reducer