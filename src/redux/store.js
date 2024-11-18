import {configureStore} from "@reduxjs/toolkit";
import usersreducer from './slice/UsersSlise.js'

const store = configureStore({
    reducer: {
        usersreducer,
    }
})

export default store