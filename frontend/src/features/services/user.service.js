import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

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