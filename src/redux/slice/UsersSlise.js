import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    users:[],
    loading: false,
    error: ""
}

export const getUsers = createAsyncThunk(
    'getUsers',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:3000/users")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, {payload}) => {
            state.users = payload
            state.error = ""
            state.loading = false
        })
        builder.addCase(getUsers.pending, (state, {payload}) => {
            state.loading = true
        })
        builder.addCase(getUsers.rejected, (state, {payload}) => {
            state.error = payload
            state.loading = false
        })
    }
})
export default usersSlice.reducer