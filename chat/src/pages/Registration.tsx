/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import * as formik from "formik";
import { useSelector, useDispatch } from "react-redux";

import { newuser } from "store/signupSlice";
import type { RootState } from "store/index";
import { useTranslation } from "react-i18next";
import AuthLayout from "layouts/auth";
import { Link } from "react-router-dom";

function SignUp() {
  const { t } = useTranslation();
  interface FormValues {
    username: string;
    password: string;
    confirmpass: string;
  }

  const error = useSelector((state: RootState) => state.signup.error);
  const [errorsSignup, setErrorsSignup] = useState("");

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.statusCode === 409) {
      setErrorsSignup("Упс, имя пользователя уже существует");
    } else {
      setErrorsSignup("Oops no user");
    }
  }, [error]);

  const dispatch = useDispatch();

  const { Formik } = formik;

  const initialValues: FormValues = {
    username: "",
    password: "",
    confirmpass: "",
  };

  const SignupSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t("shema.min"))
      .max(20, t("shema.max"))
      .required(t("shema.required")),
    password: yup
      .string()
      .min(6, t("shema.minPassword"))
      .required(t("shema.required")),
    confirmpass: yup
      .string()
      .oneOf([yup.ref("password")], t("shema.confirmpass"))
      .required(t("shema.required")),
  });

  const handleSubmitForm = async (values: FormValues) => {
    await dispatch(
      newuser({ username: values.username, password: values.password }),
    );
  };

  return (
    <AuthLayout>
      <div className="auth-form">
        <div className="d-flex align-items-center justify-content-center w-50">
          <img
            src="https://i.ibb.co/KD0qXch/felix-registration.png"
            alt="felix-happy"
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
            <Form noValidate className="signup" onSubmit={handleSubmit}>
              {/* <h2 className="signup__h2">{t("signup.header")}</h2> */}
              <Form.Group className="mb-3" controlId="usernameSignUp">
                <Form.Label>{t("signup.form.username")}</Form.Label>
                <Form.Control
                  name="username"
                  type="username"
                  placeholder={t("signup.form.usernamePlaceholder")}
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={!!errors.username}
                  className="signup__username"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="passwordSignUp">
                <Form.Label>{t("signup.form.password")}</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder={t("signup.form.passwordPlaceholder")}
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmpassSignUp">
                <Form.Control
                  name="confirmpass"
                  type="password"
                  placeholder={t("signup.form.confirmpassPlaceholder")}
                  value={values.confirmpass}
                  onChange={handleChange}
                  isValid={touched.confirmpass && !errors.confirmpass}
                  isInvalid={!!errors.confirmpass}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmpass}
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="signup__submit mb-4" type="submit">
                {t("signup.buttonSubmit")}
              </Button>

              <div className="auth-link">
                <span>{t("signup.auth.text")}</span>
                <br />
                <Link to="/login" className="auth-signup__link">
                  {t("signup.auth.link")}
                </Link>
              </div>
              {errorsSignup && (
                <Alert variant="danger" className="w-100">
                  {errorsSignup}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
