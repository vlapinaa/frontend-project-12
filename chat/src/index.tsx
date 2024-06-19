import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "utils/i18next";
import store from "store/index";

import AuthorizationPage from "pages/Authorization";
import RegistrationPage from "pages/Registration";
import ChatPage from "pages/Chat";
import ErrorPage from "pages/Error";
import PrivateRoute from "components/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/index.scss";
import { Provider as PrRolls } from "@rollbar/react";
import routes from "helpers/routes";

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: "testenv",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <BrowserRouter>
    <PrRolls config={rollbarConfig}>
      <Provider store={store}>
        <Routes>
          <Route
            path={routes.main}
            element={<PrivateRoute Component={ChatPage} />}
          />

          <Route
            path={routes.login}
            element={
              <PrivateRoute Component={AuthorizationPage} unauthorizedOnly />
            }
          />

          <Route
            path={routes.signup}
            element={
              <PrivateRoute Component={RegistrationPage} unauthorizedOnly />
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </PrRolls>
  </BrowserRouter>,
);
