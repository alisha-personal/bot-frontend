import { createSlice } from "@reduxjs/toolkit";

const serverStatusSlice = createSlice({
    name: 'serverStatus',
    initialState : {
        value : false
    },
    reducers: {
        setStatus: (state, action) => {
            state.value = action.payload
        }
    }
});

export const {setStatus} = serverStatusSlice.actions;
export default serverStatusSlice.reducer;