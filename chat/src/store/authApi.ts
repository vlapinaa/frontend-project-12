import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiQuery from "utils/apiQuery";
import type { Values, NewUser, ResponseAuth } from "types";
import routesAPI from "helpers/routesAPI";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(apiQuery),
  endpoints: (builder) => ({
    auth: builder.mutation<ResponseAuth, Values>({
      query: (values: Values) => ({
        url: routesAPI.auth,
        method: "POST",
        body: values,
      }),
    }),
    signUp: builder.mutation<ResponseAuth, NewUser>({
      query: (newUser: NewUser) => ({
        url: routesAPI.newUser,
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

const { useAuthMutation, useSignUpMutation } = authApi;

export { useAuthMutation, useSignUpMutation };
