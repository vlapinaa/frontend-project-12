import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({
  Component,
  unauthorizedOnly,
}: {
  Component: any;
  unauthorizedOnly?: boolean;
}) {
  if (unauthorizedOnly) {
    return localStorage.getItem("token") ? <Navigate to="/" /> : <Component />;
  }

  return localStorage.getItem("token") ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
}

PrivateRoute.defaultProps = {
  unauthorizedOnly: false,
};

export default PrivateRoute;
