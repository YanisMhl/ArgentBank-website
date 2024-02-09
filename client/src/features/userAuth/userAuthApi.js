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
        }),
        userProfile: builder.mutation({
            query: ({ token }) => ({
                url: 'user/profile',
                method: 'POST',
                headers : {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        }),
        usernameEdit: builder.mutation({
            query: ({ newUsername, token }) => ({
                url: 'user/profile',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: { "userName": newUsername }
            })
        })
    })
});

export const { useUserLoginMutation, useUserProfileMutation, useUsernameEditMutation } = userAuth;