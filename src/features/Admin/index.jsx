import { PrivateRouteAdmin, PrivateRouteAdminAuth } from 'components/PrivateRoute';
import AuthFeature from 'features/Auth';
import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
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
      </Switch>
    </>
  );
}

export default AdminFeature;