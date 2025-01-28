import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: 'sessions',
    initialState : {
        data : []
    },
    reducers: {
        setSessions : (state, action) => {
            state.value = action.payload
        }
    }
});

export const {setSessions} = sessionSlice.actions;
export default sessionSlice.reducer;