import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    loading: false,
    error: ""
}

export const getUsers = createAsyncThunk(
    'getUsers',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8000/users")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getUser = createAsyncThunk(
    'getUser',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${id}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addUser = createAsyncThunk(
    'addUser',
    async (newUser, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8000/users", newUser);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const editUser = createAsyncThunk(
    'editUser',
    async ({id, updatedUser}, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:8000/users/${id}`, updatedUser);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            state.users = payload
            state.error = ""
            state.loading = false
        })
            .addCase(getUsers.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getUsers.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })

        builder.addCase(addUser.fulfilled, (state, { payload }) => {
            state.users.push(payload); // Add the newly created user to the state
            state.error = "";
            state.loading = false;
        })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });

        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            state.currentUser = payload;
            state.error = "";
            state.loading = false;
        })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });

        builder.addCase(editUser.fulfilled, (state, { payload }) => {
            state.users.push(payload); // Add the newly created user to the state
            state.error = "";
            state.loading = false;
        })
            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.rejected, (state, { payload }) => {
                state.error = payload;
                state.loading = false;
            });
    }
})
export default usersSlice.reducer