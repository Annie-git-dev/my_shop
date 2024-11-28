import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    bagProducts: [],
    loading: false,
    error: ""
}

export const getBagProducts = createAsyncThunk(
    'getBagProducts',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8000/bagProducts")
            const data = response.data.filter(e => e.userId === userId)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addBagProducts = createAsyncThunk(
    'addBagProducts',
    async (product, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8000/bagProducts", product)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const removeBagProducts = createAsyncThunk(
    'removeBagProducts',
    async (ids, thunkAPI) => {
        try {
            const deleteRequests = ids.map(id => 
                axios.delete(`http://localhost:8000/bagProducts/${id}`)
            );

            const responses = await Promise.all(deleteRequests);
            return responses.map(response => response.data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const bagProductsSlice = createSlice({
    name: 'bagProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBagProducts.fulfilled, (state, { payload }) => {
            state.bagProducts = payload
            state.error = ""
            state.loading = false
        })
            .addCase(getBagProducts.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getBagProducts.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })

        builder.addCase(addBagProducts.fulfilled, (state, { payload }) => {
            state.error = ""
            state.loading = false
        })
            .addCase(addBagProducts.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(addBagProducts.rejected, (state, { payload }) => {
                state.error = payload
                state.loading = false
            })
    }
})

export default bagProductsSlice.reducer