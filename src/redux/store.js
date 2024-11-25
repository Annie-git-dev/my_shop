import {configureStore} from "@reduxjs/toolkit";
import usersReducer from './slice/UsersSlise.js'
import productsReducer from './slice/ProductsSlice.js'
import bagProductsReducer from './slice/BagProductsSlice.js'

const store = configureStore({
    reducer: {
        usersReducer,
        productsReducer,
        bagProductsReducer
    }
})

export default store