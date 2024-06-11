import React from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import * as formik from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "store/authSlice";
import type { RootState } from "store/index";
import { useTranslation } from "react-i18next";
import MainLayout from "layouts/main";

function AuthorizationPage() {
  const { t } = useTranslation();
  interface FormValues {
    username: string;
    password: string;
  }

  const error = useSelector((state: RootState) => state.auth.error);

  const dispatch = useDispatch();

  const { Formik } = formik;

  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const SignupSchema = yup.object().shape({
    username: yup.string().required(t("shema.required")),
    password: yup.string().required(t("shema.required")),
  });

  const handleSubmitForm = async (
    values: FormValues,
    { setErrors }: formik.FormikHelpers<FormValues>,
  ) => {
    await dispatch(login(values));
    if (error) {
      setErrors({
        username: " ",
        password: t("alert.auth"),
      });
    }
  };

  return (
    <MainLayout>
      <div className="auth-form shadow">
        <div className="auth-form__image-container">
          <img
            src="https://i.ibb.co/mhzwn47/felix.png"
            alt="felix"
            className="w-75"
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmitForm}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="auth-form__form d-flex flex-column justify-items-between align-items-between"
            >
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>{t("auth.login.name")}</Form.Label>
                <Form.Control
                  name="username"
                  type="username"
                  placeholder={t("auth.login.placeholder")}
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>{t("auth.password.name")}</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder={t("auth.password.placeholder")}
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <button className="auth-form__submit mb-5 w-50" type="submit">
                {t("auth.buttonSubmit")}
              </button>

              <div className="auth-signup">
                <span>{t("auth.authSignup.text")}</span>
                <Link to="/signup" className="auth-signup__link">
                  {t("auth.authSignup.link")}
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}

export default AuthorizationPage;
