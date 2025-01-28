import { configureStore } from "@reduxjs/toolkit";
import userLoggedInReducer from './slices/userLogInSlice';
import authTokenReducer from './slices/authTokenSlice';
import serverStatusReducer from './slices/serverStatusSlice';
import userNameReducer from './slices/userNameSlice';
import sessionReducer from './slices/sessionSlice'

const store = configureStore({
    reducer: {
        userLoggedIn : userLoggedInReducer,
        authToken : authTokenReducer,
        serverStatus : serverStatusReducer,
        userName: userNameReducer,
        sessions: sessionReducer,
    }
});

export default store;