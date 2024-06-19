/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "store";

import { createNewUser } from "store/authSlice";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MainLayout from "layouts/main";
import routes from "helpers/routes";

function SignUp() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  interface FormValues {
    username: string;
    password: string;
    confirmpass: string;
  }

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

  const handleSubmitForm = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const response = await dispatch(
      createNewUser({ username: values.username, password: values.password }),
    );

    if (response.meta.requestStatus === "rejected") {
      if (response.payload.statusCode === 409) {
        setErrors({
          username: " ",
          password: " ",
          confirmpass: "Такой пользователь уже существует",
        });
      } else {
        setErrors({
          username: " ",
          password: " ",
          confirmpass: response.payload.message,
        });
      }
    }
  };

  return (
    <MainLayout>
      <div className="signup-page">
        <div className="signup-page__image">
          <img
            src="https://i.ibb.co/KD0qXch/felix-registration.png"
            alt="felix-happy"
            className=""
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
              className="signup-page__form signup-form"
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
                  className="signup-form__username"
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
                <Form.Label>{t("signup.form.confirmpass")}</Form.Label>
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

              <Button className="signup-form__submit mb-4" type="submit">
                {t("signup.buttonSubmit")}
              </Button>

              <div className="auth-link">
                <span>{t("signup.auth.text")}</span>
                <br />
                <Link to={routes.login} className="auth-signup__link">
                  {t("signup.auth.link")}
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}

export default SignUp;
