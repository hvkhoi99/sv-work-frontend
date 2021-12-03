import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminLoginPage from './pages/Login';
import AdminMainPage from './pages/MainPage';

AdminFeature.propTypes = {

};

function AdminFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}/login`} component={AdminLoginPage} />
        <Route path={match.url} component={AdminMainPage} />
      </Switch>
    </>
  );
}

export default AdminFeature;