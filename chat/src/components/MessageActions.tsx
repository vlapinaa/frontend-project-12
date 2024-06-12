import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as filter from "leo-profanity";
import SvgMessageSend from "./SvgMessageSend";

function MessageActions({
  sendMessage,
  className,
}: {
  sendMessage: (message: string) => void;
  className?: string;
}) {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message) {
      const filterMessage = filter.clean(message);
      sendMessage(filterMessage);
      setMessage("");
    }
  };

  return (
    <form
      className={`messages-actions ${className} `}
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        className="messages-actions__input"
        aria-label="Новое сообщение"
        placeholder={t("chat.messagePlaceholder")}
        value={message}
        onChange={handleChange}
      />
      <button type="submit" aria-label="Send" disabled={!message}>
        <SvgMessageSend />
      </button>
    </form>
  );
}

MessageActions.defaultProps = {
  className: "",
};

export default MessageActions;
