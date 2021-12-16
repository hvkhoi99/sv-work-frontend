import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterAccountPage from './pages/Account';
import RecruiterDashboardPage from './pages/RecruiterDashboard';
import RecruiterProfilePage from './pages/RecruiterProfile';

RecruiterMeFeature.propTypes = {

};

function RecruiterMeFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}/profile`} component={RecruiterProfilePage} />
        <Route path={`${match.url}/dashboard`} component={RecruiterDashboardPage} />
        <Route path={`${match.url}/account`} component={RecruiterAccountPage} />
      </Switch>
    </>
  );
}

export default RecruiterMeFeature;