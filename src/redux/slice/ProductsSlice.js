import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    categories: [],
    price: 0,
    rate: 0,
    loading: false,
    error: ""
}

export const getProducts = createAsyncThunk(
    'getProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8000/products")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'updateProduct',
    async (productData, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:8000/products/${productData.id}`, productData);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeRating: (state, { payload }) => {
            state.rate = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            let category = payload.map(elem => elem.category)
            state.categories = category.filter((value, index) => category.indexOf(value) === index)
            state.price = Math.max(...payload?.map(item => item.price))
            state.rate = 5
            // state.rate = Math.max(...payload?.map(item => item.rating.rate))
            state.products = payload
            state.error = ""
            state.loading = false
        })
        builder.addCase(getProducts.pending, (state, { payload }) => {
            state.loading = true
        })
        builder.addCase(getProducts.rejected, (state, { payload }) => {
            state.error = payload
            state.loading = false
        })

        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.error = ""
            state.loading = false
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
            state.error = payload
            state.loading = false
        })
    }
})

export const { changeRating } = productsSlice.actions

export default productsSlice.reducer