import { createSlice } from "@reduxjs/toolkit";

const userLoggedInSlice = createSlice({
    name: 'userLoggedIn',
    initialState : {
        value : false
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        }
    }
});

export const { toggle } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;