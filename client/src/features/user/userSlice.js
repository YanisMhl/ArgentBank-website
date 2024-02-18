import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    userName: localStorage.getItem("userName") ? localStorage.getItem("userName") : "",
    createdAt: "",
    updatedAt: "",
    id: "",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return {...state, ...action.payload}
        },
        setUsername(state, action) {
            state.userName = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        logout(state) {
            state.token = null;
        }  
    }
})

export const { setUser, setUsername, setToken, logout } = userSlice.actions;
export default userSlice.reducer;