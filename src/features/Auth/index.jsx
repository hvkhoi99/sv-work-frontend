import AdminLoginPage from "features/Admin/pages/Login";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

AuthFeature.propTypes = {};

function AuthFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}/login`} component={AdminLoginPage} />
      </Switch>
    </>
  );
}

export default AuthFeature;
