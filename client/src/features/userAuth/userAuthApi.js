import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userAuth = createApi({
    reducerPath: "userAuth",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/api/v1/"}),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: ({ email, password }) => ({
                url: 'user/login',
                method: 'POST',
                body: { "email": email, "password": password }
            })
        })
    })
});

export const { useUserLoginMutation } = userAuth;