/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import * as formik from "formik";
import { useSelector, useDispatch } from "react-redux";
import Layout from "layouts";

import { newuser } from "store/signupSlice";
import type { RootState } from "store/index";
import { useTranslation } from "react-i18next";

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
    <Layout>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="d-flex flex-column signup-form shadow align-items-center justify-content-center">
          <h2 className="signup-h2">{t("signup.header")}</h2>
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
                className="d-flex flex-column align-items-center justify-content-center"
                onSubmit={handleSubmit}
              >
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
                    className="signup-username"
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

                <Button className="signup-submit mb-4" type="submit">
                  {t("signup.buttonSubmit")}
                </Button>

                {errorsSignup && (
                  <Alert variant="danger" className="w-100">
                    {errorsSignup}
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
