import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterCreateEventPage from './pages/CreatePage';
import DetailEventPage from './pages/DetailEvent';
import EventDashboardPage from './pages/EventDashboardPage';
import RecruiterMainEventPage from './pages/MainPage';
import SearchEventPage from './pages/SearchEvent';

RecruiterEventFeature.propTypes = {

};

function RecruiterEventFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={match.url} component={RecruiterMainEventPage} />
        <Route exact path={`${match.url}/search`} component={SearchEventPage} />
        <Route exact path={`${match.url}/create`} component={RecruiterCreateEventPage} />
        <Redirect
          exact
          from={`${match.url}/dashboard`}
          to={`${match.url}/dashboard/posted-event`}
        />
        <Route exact path={`${match.url}/dashboard/posted-event`} component={EventDashboardPage} />
        <Route exact path={`${match.url}/dashboard/joined-event`} component={EventDashboardPage} />
        <Redirect
          exact
          from={`${match.url}/dashboard/posted-event/:id`}
          to={`${match.url}/dashboard/posted-event/:id/detail`}
        />
        <Route exact path={`${match.url}/dashboard/posted-event/:id`} component={DetailEventPage} />
        <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/detail`} />
        <Route exact path={`${match.url}/:id/detail`} component={DetailEventPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default RecruiterEventFeature;