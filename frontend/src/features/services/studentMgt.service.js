
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

let baseUrl = "/admin/students"
export const addStudent = createAsyncThunk(
    "students/add",
    async (postData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${baseUrl}/add`, postData).then((response) => response)
            console.log(res)
            return res
        } catch(err) {
            if(err.response) return rejectWithValue(err.response.data)
            return rejectWithValue("Oops there seem to be an error")
        }
    }
  );

export const studentList = createAsyncThunk(
    "students/list",
    async (data="", { rejectWithValue }) => {
        try {
            const res = await axios.get(`${baseUrl}/list`).then(response => response)
            console.log(res)
            return res
        } catch(err) {
            if(err.response) return rejectWithValue(err.response.data)
            return rejectWithValue("Oops there seep to be an error")
        }
    }
)