import React, { useRef } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "store/index";
import type { Message } from "types";

function Messages({
  messages,
  messagesContainer,
}: {
  messages: Message[];
  messagesContainer: any;
}) {
  const name = useSelector((state: RootState) => state.auth.name);

  return (
    <div className="messages-body" ref={messagesContainer}>
      {messages.map((message) => {
        return (
          <div
            className={`message d-flex ${
              message.username === name
                ? "justify-content-end"
                : "justify-content-start"
            }`}
            key={message.id}
          >
            <div className="message-inner">
              <div className="message-username">{message.username}</div>
              <div className="message-body">{message.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
