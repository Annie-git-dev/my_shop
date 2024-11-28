import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    likedProducts: [],
    loading: false,
    error: ""
}

export const getLikedProducts = createAsyncThunk(
    'getLikedProducts',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8000/likedProducts")
            const data = response.data.filter(e => e.userId === userId)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addLikedProducts = createAsyncThunk(
    'addLikedProducts',
    async (product, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8000/likedProducts", product)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const removeLikedProducts = createAsyncThunk(
    'removeLikedProducts',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:8000/likedProducts/${id}`)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const likedProductsSlice = createSlice({
    name: 'likedProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getLikedProducts.fulfilled, (state, { payload }) => {
            state.likedProducts = payload
            state.error = ""
            state.loading = false
        })
            .addCase(getLikedProducts.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getLikedProducts.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })

        builder.addCase(addLikedProducts.fulfilled, (state, { payload }) => {
            state.error = ""
            state.loading = false
        })
            .addCase(addLikedProducts.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(addLikedProducts.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })
    }
})

export default likedProductsSlice.reducer