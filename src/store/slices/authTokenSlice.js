import { createSlice } from "@reduxjs/toolkit";

const authTokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        value : ''
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload;
        } 
    }
});

export const {setToken} = authTokenSlice.actions;
export default authTokenSlice.reducer;