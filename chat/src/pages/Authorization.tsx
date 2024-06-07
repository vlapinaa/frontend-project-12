import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import * as formik from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "store/authSlice";
import type { RootState } from "store/index";
import felix from "images/felix.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "layouts/auth";

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

  const handleSubmitForm = async (values: FormValues) => {
    await dispatch(login(values));
  };

  return (
    <AuthLayout>
      <div className="auth-form">
        <div className="d-flex align-items-center w-50">
          <img src={felix} alt="felix" className="w-75" />
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
              className="d-flex flex-column justify-items-between align-items-between"
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
              {error && (
                <Alert variant="danger" className="auth-alert">
                  Oops no user
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}

export default AuthorizationPage;
