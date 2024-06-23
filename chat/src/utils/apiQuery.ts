import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const apiQuery: FetchBaseQueryArgs = {
  baseUrl: "/api/v1",
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
};

export default apiQuery;
