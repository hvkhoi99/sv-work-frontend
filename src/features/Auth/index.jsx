import NotFoundPage from "components/NotFound";
import AdminLoginPage from "features/Admin/pages/Login";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RedirectEmailVerifyingPage from "./pages/RedirectEmailVerifying";
import RedirectSuccessForgotPassword from "./pages/RedirectSuccessForgotPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
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
        <Route exact path={`${match.url}/email/verify`} component={RedirectEmailVerifyingPage} />
        <Route exact path={`${match.url}/forgot-password`} component={ForgotPasswordPage} />
        <Route exact path={`${match.url}/reset-password`} component={ResetPasswordPage} />
        <Route exact path={`${match.url}/resend-forgot`} component={RedirectSuccessForgotPassword} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default AuthFeature;
