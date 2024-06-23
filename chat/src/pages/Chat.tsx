import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  useFetchChanellsQuery,
  useFetchMessagesQuery,
  useAddMessageMutation,
} from "store/chatApi";

import MainLayout from "layouts/main";
import type { RootState, AppDispatch } from "store/index";
import Messages from "components/Message";
import Channels from "components/Channels";
import MessageActions from "components/MessageActions";
import type { Channel, Message } from "types";
import { Socket } from "socket.io-client";

function ChatPage({ socket }: { socket: Socket }) {
  // const channels: Channel[] = useSelector(
  //   (state: RootState) => state.chat.chanells,
  // );
  // const messages = useSelector((state: RootState) => state.chat.messages);

  const { data: channels = [], refetch: refetchChannel } =
    useFetchChanellsQuery();
  const { data: messages = [], refetch: refetchMessage } =
    useFetchMessagesQuery();

  const [addNewMessage] = useAddMessageMutation();

  const username = useSelector((state: RootState) => state.auth.name);

  const messagesContainer = useRef<HTMLInputElement>(null);

  const [activeChannel, setChannels] = useState<Channel>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!activeChannel && channels) {
      setChannels(channels[0]);
    }
    messagesContainer.current?.scrollTo({
      top: messagesContainer.current.scrollHeight,
      behavior: "smooth",
    });
  }, [channels, activeChannel]);

  useEffect(() => {
    socket.on("newChannel", () => {
      refetchChannel();
    });

    socket.on("removeChannel", () => {
      refetchChannel();
    });

    socket.on("renameChannel", () => {
      refetchChannel();
    });

    socket.on("newMessage", () => {
      refetchMessage();
    });

    return () => {
      socket.off("newChannel");
      socket.off("removeChannel");
      socket.off("renameChannel");
      socket.off("newMessage");
    };
  }, [dispatch, socket, refetchMessage, refetchChannel]);

  const sendMessage = async (message: string) => {
    const newMessage = {
      body: message,
      channelId: activeChannel?.id,
      username,
    };
    addNewMessage(newMessage);

    messagesContainer.current?.scrollTo({
      top: messagesContainer.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const activeMessages: Message[] | undefined = messages?.filter(
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
