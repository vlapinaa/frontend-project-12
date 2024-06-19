import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Channel } from "types";
import ChannelAdding from "components/ChannelAdding";

import { useTranslation } from "react-i18next";
import Modals from "./Modals";
import Dropdown from "./Dropdown";

interface ChannelsProps {
  channels: Channel[];
  activeChannel: Channel | undefined;
  setChannels: (channel: Channel) => void;
}

function Channels({ channels, activeChannel, setChannels }: ChannelsProps) {
  const { t } = useTranslation();

  // const classChannel = `channels-list__item ${channel.id === activeChannel?.id ? "channels-list__item--active" : ""}`;

  const [id, setId] = useState("");

  return (
    <div className="channels d-flex flex-column align-items-center justify-content-center w-100 h-100">
      <div className="channels__heading d-flex flex-row align-items-center justify-content-between font-weight-bold text-center text-lg-start">
        <div className="m-0">{t("chat.channels.header")}</div>
        <ChannelAdding setChannels={setChannels} />
      </div>

      <div className="channels__list channels-list font-secondary">
        {channels.map((channel) => {
          return (
            <button
              className={
                channel.id === activeChannel?.id
                  ? "w-100 rounded-0 text-start text-truncate btn btn-secondary"
                  : "w-100 rounded-0 text-start text-truncate btn"
              }
              type="button"
              key={channel.id}
              onClick={() => setChannels(channel)}
              style={{ overflow: "auto !important" }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <span># </span>
                  {channel.name}
                </div>

                {channel.removable && (
                  <Dropdown id={channel.id} setId={setId} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Modals id={id} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container-channel"
      />
    </div>
  );
}

export default Channels;
