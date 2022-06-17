import "./App.css";
import AuthContext from "./store/auth-context";
import React, { Fragment, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AllMembers from "./pages/AllMembers";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/header/Header";
import Dashboard from "./components/Dashboard";
import Member from "./pages/Member";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";

import AddMembership from "./pages/AddMembership";
import EditMembership from "./pages/EditMembership";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            !authCtx.isLoggedIn ? <Login /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          exact
          path="/login"
          element={
            !authCtx.isLoggedIn ? <Login /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            authCtx.isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/allMembers"
          element={
            authCtx.isLoggedIn ? <AllMembers /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/member/:id"
          element={authCtx.isLoggedIn ? <Member /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/addMember"
          element={
            authCtx.isLoggedIn ? <AddMember /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/editMember/:id"
          element={
            authCtx.isLoggedIn ? <EditMember /> : <Navigate to="/login" />
          }
        />

<Route
          exact
          path="/addMembership/:mid"
          element={
            authCtx.isLoggedIn ? <AddMembership /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/editMembership/:msid"
          element={
            authCtx.isLoggedIn ? <EditMembership /> : <Navigate to="/login" />
          }
        />
        {/* {authCtx.isLoggedIn ? (
          <React.Fragment>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allMembers" element={<AllMembers />} />
            <Route path="/member/:id" element={<Member />} />
            <Route path="/addMember" element={<AddMember />} />
          </React.Fragment>
        ) : (
          <Navigate to="/login" />
        )} */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
