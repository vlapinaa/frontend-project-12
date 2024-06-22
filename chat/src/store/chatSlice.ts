import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import api from "utils/api";
import type { Channel, Message } from "types";
import routesAPI from "helpers/routesAPI";

type State = {
  chanells: Channel[];
  messages: Message[];
};

export const fetchChanells = createAsyncThunk(
  "chat/fetchChanells",
  async () => {
    const { data } = await api.get(routesAPI.channels);
    return data;
  },
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async () => {
    const { data } = await api.get(routesAPI.messages);
    return data;
  },
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chanells: [],
    messages: [],
  } as State,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.chanells.push(action.payload);
    },
    renameChannel: (state, action: PayloadAction<Channel>) => {
      state.chanells.map((chanell, index) => {
        if (chanell.id === action.payload.id) {
          state.chanells[index].name = action.payload.name;
          return chanell;
        }
        return chanell;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChanells.fulfilled, (state, action) => {
      state.chanells = action.payload;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { addMessage, addChannel, renameChannel } = chatSlice.actions;
export default chatSlice.reducer;
