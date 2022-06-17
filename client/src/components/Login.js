import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Card from "../UI/Card";
import classes from "./Login.module.css";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [formError, setFormError] = useState(null);
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const setUsername = (e) => {
    setEnteredUsername(e.target.value);
  };
  const setPassword = (e) => {
    setEnteredPassword(e.target.value);
  };
  const clearForm = () => {
    setEnteredPassword("");
    setEnteredUsername("");
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    // const formData = new FormData();
    // formData.append("username", enteredUsername);
    // formData.append("password", enteredPassword);
    // console.log(formData.get("username"));

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    axios
      .post(process.env.REACT_APP_API_KEY + "/users", userData)
      .then((res) => {
        // console.log(res.data);
        if (!res.data.success) {
          clearForm();
          setFormError(res.data.message);
          return;
        }
        //successfull form validation
        authCtx.login(enteredUsername, enteredPassword);
        setFormError(null);
        clearForm();
        navigate("/allMembers");
      })
      .catch((err) => {
        clearForm();
        setFormError(err.message);
        return;
      });
  };

  return (
    <div>
      <h1>Rao Gyms</h1>
      <Card myClasses={classes.myCard}>
        <form onSubmit={loginSubmitHandler}>
          <div>
            <h3>Login Form</h3>
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              required
              onChange={setUsername}
              value={enteredUsername}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              required
              onChange={setPassword}
              value={enteredPassword}
            />
          </div>
          {formError && (
            <div className={classes.errorDiv}>
              <p>{formError}</p>
            </div>
          )}
          <div>
            <button>Login</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
