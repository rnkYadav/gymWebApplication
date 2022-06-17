import { useReducer } from "react";
import AuthContext from "./auth-context";

const initialAuthState = {
  email: localStorage.getItem("rao_gyms_email"),
  password: localStorage.getItem("rao_gyms_password"),
  isLoggedIn: localStorage.getItem("rao_gyms_email") ? true : false,
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    // console.log(action.email + " Loggin Request");
    return {
      email: action.email,
      password: action.password,
      isLoggedIn: true,
    };
  }
  if (action.type === "LOGOUT") {
    return initialAuthState;
  }
  return initialAuthState;
};

const AuthProvider = (props) => {
  const [authState, setAuthDispatch] = useReducer(
    authReducer,
    initialAuthState,
  );
  // console.log(authState);

  const loginHandler = (email, password) => {
    localStorage.setItem("rao_gyms_email", email);
    localStorage.setItem("rao_gyms_password", password);
    setAuthDispatch({ type: "LOGIN", email: email, password: password });
  };
  const logoutHandler = () => {
    localStorage.clear();
    setAuthDispatch({ type: "LOGOUT" });
  };

  const initialContextValue = {
    email: authState.email,
    password: authState.password,
    isLoggedIn: authState.isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={initialContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
