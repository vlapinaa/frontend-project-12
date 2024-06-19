import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "store";
import routes from "helpers/routes";

function PrivateRoute({
  Component,
  unauthorizedOnly,
}: {
  Component: any;
  unauthorizedOnly?: boolean;
}) {
  const token = useSelector((state: RootState) => state.auth.token);

  if (unauthorizedOnly) {
    return token ? <Navigate to={routes.main} /> : <Component />;
  }

  return token ? <Component /> : <Navigate to={routes.login} />;
}

PrivateRoute.defaultProps = {
  unauthorizedOnly: false,
};

export default PrivateRoute;
