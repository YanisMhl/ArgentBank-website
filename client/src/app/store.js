import { configureStore } from "@reduxjs/toolkit";
import { userAuth } from "../features/userAuth/userAuthApi";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userAuth.reducerPath]: userAuth.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userAuth.middleware);
    }
});