import {configureStore} from "@reduxjs/toolkit";
import usersReducer from './slice/UsersSlise.js'
import productsReducer from './slice/ProductsSlice.js'

const store = configureStore({
    reducer: {
        usersReducer,
        productsReducer
    }
})

export default store