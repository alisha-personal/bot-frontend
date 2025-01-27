import { configureStore } from "@reduxjs/toolkit";
import userLoggedInReducer from './slices/userLogInSlice';
import authTokenReducer from './slices/authTokenSlice';
import serverStatusReducer from './slices/serverStatusSlice';

const store = configureStore({
    reducer: {
        userLoggedIn : userLoggedInReducer,
        authToken : authTokenReducer,
        serverStatus : serverStatusReducer,
    }
});

export default store;