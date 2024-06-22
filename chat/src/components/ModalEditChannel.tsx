import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import api from "utils/api";
import { closeModalEdit } from "store/modalsSlice";
import { AppDispatch, RootState, useAppSelector } from "store";
import { Bounce, toast } from "react-toastify";
import * as filter from "leo-profanity";
import { useDispatch } from "react-redux";
import routesAPI from "helpers/routesAPI";

function ModalsEdit() {
  const { t } = useTranslation();
  const isShow: boolean = useAppSelector(
    (state: RootState) => state.modals.isShow,
  );
  const type: string = useAppSelector((state: RootState) => state.modals.type);
  const id: string = useAppSelector(
    (state: RootState) => state.modals.currentChannelId,
  );
  const isShowEdit = type === "edit" && isShow;
  const [newNameChannel, setnewNameChannel] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewNameChannel(event.target.value);
  };

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

  const editedChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const filterNameChannel = filter.clean(newNameChannel);
      await api.patch(`${routesAPI.channels}/${id}`, {
        name: filterNameChannel,
      });
      notifyEdit();
      dispatch(closeModalEdit());
      setnewNameChannel("");
    } catch (error) {
      throw new Error(`ooops error: ${error}`);
    }
  };

  return (
    <div>
      <Modal
        show={isShowEdit}
        onHide={() => dispatch(closeModalEdit())}
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
                onClick={() => dispatch(closeModalEdit())}
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
    </div>
  );
}

export default ModalsEdit;
