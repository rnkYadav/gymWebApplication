import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";
const Header = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };
  return (
    <div className={classes.header}>
      <Link to="#default" className={classes.logo}>
        Rao Gyms
      </Link>
      {authCtx.isLoggedIn && (
        <div className={classes.header_right}>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to="/dashboard"
          >
            dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to="/allMembers"
          >
            All Customers
          </NavLink>
          <button className={classes.logoutBtn} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}

      {!authCtx.isLoggedIn && (
        <div className={classes.header_right}>
          <Link className={classes.active} to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
