import NotFoundPage from 'components/NotFound';
import { PrivateRouteAdmin, PrivateRouteAdminAuth } from 'components/PrivateRoute';
import AuthFeature from 'features/Auth';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminMainPage from './pages/MainPage';

AdminFeature.propTypes = {

};

function AdminFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <PrivateRouteAdminAuth path={`${match.url}/auth`} component={AuthFeature} />
        <PrivateRouteAdmin path={match.url} component={AdminMainPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default AdminFeature;