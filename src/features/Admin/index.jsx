import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminNav from './components/Nav';
import Sidebar from './components/Sidebar';
import AdminDashboardPage from './pages/Dashboard';
import VerificationPage from './pages/VerificationPage';

AdminFeature.propTypes = {

};

function AdminFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <AdminNav />
      <Sidebar />
      <Switch>
        <Route exact path={match.url} component={AdminDashboardPage} />
        <Route path={`${match.url}/verification`} component={VerificationPage} />
        <Route element={NotFoundPage} />
      </Switch>
    </>
  );
}

export default AdminFeature;