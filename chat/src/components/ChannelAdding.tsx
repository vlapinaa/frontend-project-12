import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as filter from "leo-profanity";
import { useAddChannelMutation, useFetchChanellsQuery } from "store/chatApi";

import { Channel } from "types";
import { useTranslation } from "react-i18next";

interface ChannelsProps {
  setChannels: (channel: Channel) => void;
}

function ChannelAdding({ setChannels }: ChannelsProps) {
  const { t } = useTranslation();
  const notifyChannelAdding = () =>
    toast(t("chat.notifiAdding"), {
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

  const { data: channels = [] } = useFetchChanellsQuery();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  interface FormValues {
    nameChannel: string;
  }
  const addingValues: FormValues = {
    nameChannel: "",
  };

  const AddingSchema = yup.object().shape({
    nameChannel: yup
      .string()
      .min(3, t("shema.min"))
      .max(20, t("shema.max"))
      .required(t("shema.required"))
      .test({
        name: "is-exist",
        skipAbsent: false,
        test(value, context) {
          const doubleName = channels.some(
            ({ name }) => name.toLowerCase() === value.toLowerCase(),
          );
          return doubleName
            ? context.createError({ message: t("shema.doubleName") })
            : true;
        },
      }),
  });

  const [addNewChannel] = useAddChannelMutation();

  const addChannelSend = async ({ nameChannel }: FormValues) => {
    const filterNameChannel = filter.clean(nameChannel);
    const response: any = await addNewChannel(filterNameChannel);

    if (response.data) {
      setChannels(response.data);
    }

    notifyChannelAdding();
    handleClose();
  };

  return (
    <div>
      <button onClick={handleShow} type="button" className="channels__add">
        +
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        className="channels-modal"
        centered
      >
        <Modal.Header closeButton className="channels-modal__header">
          <Modal.Title>{t("chat.channels.modalAdding.text")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="channels-modal__body">
          <Formik
            initialValues={addingValues}
            validationSchema={AddingSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={addChannelSend}
          >
            {({ handleSubmit, errors, touched, values, handleChange }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="nameChannel">
                  <Form.Label className="visually-hidden">
                    Имя канала
                  </Form.Label>
                  <Form.Control
                    name="nameChannel"
                    type="text"
                    value={values.nameChannel}
                    onChange={handleChange}
                    isValid={touched.nameChannel && !errors.nameChannel}
                    isInvalid={!!errors.nameChannel}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nameChannel}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="channels-modal__cancel"
                  >
                    {t("chat.cancel")}
                  </Button>
                  <div>
                    <Button className="channels-modal__submit" type="submit">
                      {t("chat.channels.modalAdding.submit")}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChannelAdding;
