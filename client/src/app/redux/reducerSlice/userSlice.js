// userSlice.js

import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    token: '',
    role: '',
    id: '',
    name: '',
    municipality: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            const { token, role, id, name, phone,municipality } = action.payload;
            return {
                ...state,
                token, role, id, name, phone,municipality
            }
        },
        logout: (state, action) => {
            return {
                ...initialState
            }
        },
    }
});

export const { setUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
