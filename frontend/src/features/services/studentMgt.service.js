
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const addStudent = createAsyncThunk(
    "student/add",
    async (postData, { rejectWithValue }) => {
        try {
            const res = await axios.post("/admin/student/add", postData).then((response) => response)
            console.log(res)
            return res
        } catch(err) {
            if(err.response) return rejectWithValue(err.response.data)
            return rejectWithValue("Oops there seem to be an error")
        }
    }
  );