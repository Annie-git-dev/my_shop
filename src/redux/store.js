import {configureStore} from "@reduxjs/toolkit";
import usersReducer from './slice/UsersSlise.js'
import productsReducer from './slice/ProductsSlice.js'
import bagProductsReducer from './slice/BagProductsSlice.js'
import likedProductsReducer from './slice/LikedProductsSlice.js'

const store = configureStore({
    reducer: {
        usersReducer,
        productsReducer,
        bagProductsReducer,
        likedProductsReducer
    }
})

export default store