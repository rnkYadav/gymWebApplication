import React from "react";

const AuthContext = React.createContext({
  email: "",
  password: "",
  isLoggedIn: false,
  login: (email, password) => {},
  logout: () => {},
});

export default AuthContext;
