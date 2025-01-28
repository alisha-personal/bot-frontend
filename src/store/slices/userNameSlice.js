import { createSlice } from "@reduxjs/toolkit";

const userNameSlice = createSlice({
    name: 'userName',
    initialState: {
        value : ''
    },
    reducers: {
        setUserName : (state, action) => {
            state.value = action.payload
        }
    },
});

export const {setUserName} = userNameSlice.actions;
export default userNameSlice.reducer;