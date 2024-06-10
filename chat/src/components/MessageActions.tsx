import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as filter from "leo-profanity";

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
        placeholder={t("chat.messagePlaceholder")}
        value={message}
        onChange={handleChange}
      />
      <button type="submit" aria-label="Send" disabled={!message}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: "20px", height: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
}

MessageActions.defaultProps = {
  className: "",
};

export default MessageActions;
