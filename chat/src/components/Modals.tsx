import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import api from "utils/api";
import { closeModalEdit, closeModalRemove } from "store/modalsSlice";
import { AppDispatch, RootState, useAppSelector } from "store";
import { Bounce, toast } from "react-toastify";
import * as filter from "leo-profanity";
import { useDispatch } from "react-redux";

function Modals({ id }: { id: string }) {
  const { t } = useTranslation();
  const showEdit: boolean = useAppSelector(
    (state: RootState) => state.modals.showEdit,
  );
  const showRemove: boolean = useAppSelector(
    (state: RootState) => state.modals.showRemove,
  );

  const [newNameChannel, setnewNameChannel] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewNameChannel(event.target.value);
  };

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

  const removeChannel = async () => {
    try {
      await api.delete(`/channels/${id}`);
      notifyDelete();
      dispatch(closeModalRemove());
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
      dispatch(closeModalEdit());
    } catch (error) {
      throw new Error(`ooops error: ${error}`);
    }
  };

  return (
    <div>
      <Modal
        show={showEdit}
        onHide={closeModalEdit}
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
      <Modal
        show={showRemove}
        onHide={closeModalRemove}
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
              onClick={() => dispatch(closeModalRemove())}
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
    </div>
  );
}

export default Modals;
