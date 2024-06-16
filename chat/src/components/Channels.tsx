import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as filter from "leo-profanity";

import type { Channel } from "types";
import ChannelAdding from "components/ChannelAdding";
import api from "utils/api";

import { useTranslation } from "react-i18next";
import Dropdown from "./Dropdown";

interface ChannelsProps {
  channels: Channel[];
  activeChannel: Channel | undefined;
  setChannels: (channel: Channel) => void;
}

function Channels({ channels, activeChannel, setChannels }: ChannelsProps) {
  const { t } = useTranslation();

  const notifyDelete = () =>
    toast(t("chat.notifiDelete"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyEdit = () =>
    toast(t("chat.notifiEdit"), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const [isShow, setShow] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");
  const [newNameChannel, setnewNameChannel] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewNameChannel(event.target.value);
  };

  const removeChannel = async () => {
    try {
      await api.delete(`/channels/${id}`);
      notifyDelete();
      setShow(false);
    } catch (error) {
      throw new Error(`ooops error: ${error}`);
    }
  };

  const editedChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const filterNameChannel = filter.clean(newNameChannel);
      await api.patch(`/channels/${id}`, { name: filterNameChannel });
      notifyEdit();
      setShowEdit(false);
    } catch (error) {
      throw new Error(`ooops error: ${error}`);
    }
  };

  return (
    <div className="channels d-flex flex-column align-items-center justify-content-center w-100 h-100">
      <div className="channels__heading d-flex flex-row align-items-center justify-content-between font-weight-bold text-center text-lg-start">
        <div className="m-0">{t("chat.channels.header")}</div>
        <ChannelAdding />
      </div>

      <div className="channels__list channels-list font-secondary">
        {channels.map((channel) => {
          return (
            <button
              className={`channels-list__item ${channel.id === activeChannel?.id ? "channels-list__item--active" : ""}`}
              type="button"
              key={channel.id}
              onClick={() => setChannels(channel)}
            >
              <div># {channel.name}</div>
              {channel.removable && (
                <Dropdown
                  id={channel.id}
                  setId={setId}
                  setShow={setShow}
                  setShowEdit={setShowEdit}
                />
              )}
            </button>
          );
        })}
      </div>

      <Modal
        show={isShow}
        onHide={() => setShow(false)}
        className="delete-modal"
        centered
      >
        <Modal.Header closeButton className="delete-modal__header">
          <Modal.Title>{t("chat.channels.modalDelete.text")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="delete-modal__body">
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={() => setShow(false)}
              className="delete-modal__cancel"
            >
              {t("chat.cancel")}
            </Button>
            <Button
              className="delete-modal__submit btn btn-danger"
              type="submit"
              onClick={removeChannel}
            >
              {t("chat.channels.dropdown.delete")}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={isShowEdit}
        onHide={() => setShowEdit(false)}
        className="edit-modal"
        centered
      >
        <Modal.Header closeButton className="edit-modal__header">
          <Modal.Title>{t("chat.channels.modalEditChannel.text")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="edit-modal__body">
          <Form onSubmit={editedChannel}>
            <Form.Group className="mb-3" controlId="newNameChannel">
              <Form.Label className="visually-hidden">Имя канала</Form.Label>
              <Form.Control
                name="newNameChannel"
                type="text"
                value={newNameChannel}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                className="edit-modal__cancel"
                variant="secondary"
                onClick={() => setShowEdit(false)}
              >
                {t("chat.cancel")}
              </Button>
              <Button className="edit-modal__submit" type="submit">
                {t("chat.channels.dropdown.editName")}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
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
