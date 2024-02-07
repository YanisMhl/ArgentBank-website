import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    token: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state = action.payload;
        },
        setUsername(state, action) {
            state.userName = action.payload;
        }
    }
})

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;