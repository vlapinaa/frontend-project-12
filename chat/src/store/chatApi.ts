import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiQuery from "utils/apiQuery";
import type { Channel, Message, NewMessage } from "types";
import routesAPI from "helpers/routesAPI";

interface Values {
  id: string;
  name: string;
}

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
    renameChannel: builder.mutation<Channel, Values>({
      query: (values) => ({
        url: `${routesAPI.channels}/${values.id}`,
        method: "PATCH",
        body: {
          name: values.name,
        },
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
  useRenameChannelMutation,
} = chatApi;

export {
  useFetchChanellsQuery,
  useFetchMessagesQuery,
  useAddMessageMutation,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
};
