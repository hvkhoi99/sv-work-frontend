import AdminLoginPage from "features/Admin/pages/Login";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SelectRolePage from "./pages/SelectRole";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

AuthFeature.propTypes = {};

function AuthFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}/sign-up`} component={SelectRolePage} />
        <Route exact path={`${match.url}/sign-up/:roleId`} component={SignUpPage} />
        <Route exact path={`${match.url}/sign-in`} component={SignInPage} />
        <Route exact path={`${match.url}/admin-sign-in`} component={AdminLoginPage} />
      </Switch>
    </>
  );
}

export default AuthFeature;
