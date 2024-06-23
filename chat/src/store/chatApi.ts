import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiQuery from "utils/apiQuery";
import type { Channel, Message, NewMessage } from "types";
import routesAPI from "helpers/routesAPI";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery(apiQuery),
  endpoints: (builder) => ({
    fetchChanells: builder.query<Channel[], void>({
      query: () => ({ url: routesAPI.channels }),
    }),
    fetchMessages: builder.query<Message[], void>({
      query: () => ({ url: routesAPI.messages }),
    }),
    addMessage: builder.mutation<Message, NewMessage>({
      query: (message) => ({
        url: routesAPI.messages,
        method: "POST",
        body: message,
      }),
    }),
    addChannel: builder.mutation<Channel, string>({
      query: (filterNameChannel) => ({
        url: routesAPI.channels,
        method: "POST",
        body: {
          name: filterNameChannel,
        },
      }),
    }),
    removeChannel: builder.mutation<Channel, string>({
      query: (id) => ({
        url: `${routesAPI.channels}/${id}`,
        method: "DELETE",
      }),
    }),
    renameChannel: builder.mutation<Channel, string>({
      query: (id) => ({
        url: `${routesAPI.channels}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const {
  useFetchChanellsQuery,
  useFetchMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useRemoveChannelMutation,
} = chatApi;

export {
  useFetchChanellsQuery,
  useFetchMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useRemoveChannelMutation,
};
