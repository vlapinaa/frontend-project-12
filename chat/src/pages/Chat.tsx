import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "socket";
import {
  fetchChanells,
  fetchMessages,
  addMessage,
  addChannel,
  renameChannel,
} from "store/chatSlice";
import api from "utils/api";

import MainLayout from "layouts/main";
import type { RootState, AppDispatch } from "store/index";
import Messages from "components/Message";
import Channels from "components/Channels";
import MessageActions from "components/MessageActions";
import type { Channel, Message } from "types";

function ChatPage() {
  const channels: Channel[] = useSelector(
    (state: RootState) => state.chat.chanells,
  );

  const messages = useSelector((state: RootState) => state.chat.messages);
  const username = useSelector((state: RootState) => state.auth.name);
  const token = useSelector((state: RootState) => state.auth.token);

  const messagesContainer = useRef<HTMLInputElement>(null);

  const [activeChannel, setChannels] = useState<Channel>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchChanells());
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch, activeChannel, token]);

  useEffect(() => {
    if (!activeChannel) {
      setChannels(channels[0]);
    }
  }, [channels, activeChannel]);

  useEffect(() => {
    socket.on("newChannel", (channel: Channel) => {
      dispatch(addChannel(channel));
      setChannels(channel);
    });

    socket.on("removeChannel", () => {
      dispatch(fetchChanells());
    });

    socket.on("renameChannel", (channel: Channel) => {
      dispatch(renameChannel(channel));
    });

    socket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });
  }, [dispatch]);

  // useEffect(() => {

  //   return () => {
  //     socket.off("removeChannel");
  //   };
  // }, [dispatch]);

  // useEffect(() => {

  //   return () => {
  //     socket.off("renameChannel");
  //   };
  // }, [dispatch]);

  // useEffect(() => {

  //   return () => {
  //     socket.off("newMessage");
  //   };
  // }, [dispatch]);

  const sendMessage = async (message: string) => {
    try {
      await api.post("/messages", {
        body: message,
        channelId: activeChannel?.id,
        username,
      });

      messagesContainer.current?.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      throw new Error(`ooops ${error}`);
    }
  };

  const activeMessages: Message[] = messages?.filter(
    (message) => message.channelId === activeChannel?.id,
  );

  return (
    <MainLayout>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="chat-container shadow">
          <div className="w-25 h-100">
            <Channels
              channels={channels}
              activeChannel={activeChannel}
              setChannels={setChannels}
            />
          </div>

          <div className="messages-area flex-column">
            <div className="messages-area__heading d-flex align-items-center">
              #{activeChannel?.name}
            </div>
            <Messages
              messages={activeMessages}
              messagesContainer={messagesContainer}
              className="messages-area__body"
            />
            <MessageActions
              sendMessage={sendMessage}
              className="messages-area__actions"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ChatPage;
