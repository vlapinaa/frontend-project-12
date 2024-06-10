import React from "react";
import { useSelector } from "react-redux";

import type { RootState } from "store/index";
import type { Message } from "types";

function Messages({
  messages,
  messagesContainer,
  className,
}: {
  messages: Message[];
  messagesContainer: React.LegacyRef<HTMLDivElement> | undefined;
  className?: string;
}) {
  const name = useSelector((state: RootState) => state.auth.name);

  return (
    <div className={`${className} messages `} ref={messagesContainer}>
      {messages.map((message) => {
        return (
          <div
            className={`messages__item message ${
              message.username === name ? "message--currently-user" : ""
            }`}
            key={message.id}
          >
            <div className="message__inner">
              <div className="message__username">{message.username}</div>
              <div className="message__body font-secondary">{message.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Messages.defaultProps = {
  className: "",
};

export default Messages;
