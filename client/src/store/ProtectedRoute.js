import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "./auth-context";

const ProtectedRoute = (props) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
