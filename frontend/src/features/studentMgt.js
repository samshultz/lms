import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { addStudent } from './services/studentMgt.service'

export const studentSlice = createSlice({
    name: "student",
    initialState: {
        loading: false,
        status: 0,
        errMessage: "",
        student: {},
        students: {}
    },
    extraReducers: {
        [addStudent.pending]: (state) => {
            state.loading = true
        },
        [addStudent.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.status = payload.status
            state.student = payload
        },
        [addStudent.rejected]: (state, { payload }) => {
            state.loading = false
            state.status = payload.status
            state.errMessage = payload
        }
    }
})

export default studentSlice.reducer