import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import api from "utils/api";
import { closeModalRemove } from "store/modalsSlice";
import { AppDispatch, RootState, useAppSelector } from "store";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import routesAPI from "helpers/routesAPI";

function Modals() {
  const { t } = useTranslation();

  const isShow: boolean = useAppSelector(
    (state: RootState) => state.modals.isShow,
  );
  const type: string = useAppSelector((state: RootState) => state.modals.type);
  const id: string = useAppSelector(
    (state: RootState) => state.modals.currentChannelId,
  );
  const isShowRemove = type === "remove" && isShow;
  const dispatch = useDispatch<AppDispatch>();

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

  const removeChannel = async () => {
    try {
      await api.delete(`${routesAPI.channels}/${id}`);
      notifyDelete();
      dispatch(closeModalRemove());
    } catch (error) {
      throw new Error(`ooops error: ${error}`);
    }
  };

  return (
    <div>
      <Modal
        show={isShowRemove}
        onHide={() => dispatch(closeModalRemove())}
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
