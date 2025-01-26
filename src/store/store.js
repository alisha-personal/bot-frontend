import { configureStore } from "@reduxjs/toolkit";
import userLoggedInReducer from './slices/userLogInSlice';
import authTokenReducer from './slices/authTokenSlice';

const store = configureStore({
    reducer: {
        userLoggedIn : userLoggedInReducer,
        authToken : authTokenReducer
    }
});

export default store;