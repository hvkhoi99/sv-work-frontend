import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruitmentFeature from '../Recruitment';
import RecruiterAccountPage from './pages/Account';
import RecruiterDashboardPage from './pages/RecruiterDashboard';
import RecruiterProfilePage from './pages/RecruiterProfile';

RecruiterMeFeature.propTypes = {

};

function RecruiterMeFeature(props) {
  const match = useRouteMatch();

  const currentUI =
    <>
      <Switch>
        <Redirect
          exact
          from={`${match.url}/dashboard`}
          to={`${match.url}/dashboard/available-jobs`}
          component={RecruiterDashboardPage}
        />
        <Route exact path={`${match.url}/profile`} component={RecruiterProfilePage} />
        <Route exact path={`${match.url}/dashboard/available-jobs`} component={RecruiterDashboardPage} />
        <Route path={`${match.url}/dashboard/available-jobs/:recruitmentId`} component={RecruitmentFeature} />
        <Route path={`${match.url}/dashboard/closed-recruitments`} component={RecruiterDashboardPage} />
        <Route exact path={`${match.url}/account`} component={RecruiterAccountPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>

  return (
    <>
      {currentUI}
    </>
  );
}

export default RecruiterMeFeature;