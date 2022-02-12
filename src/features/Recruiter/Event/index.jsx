import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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
        <Route exact path={`${match.url}/dashboard`} component={EventDashboardPage} />
        {/* <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/detail`} /> */}
        <Route exact path={`${match.url}/:id/detail`} component={DetailEventPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default RecruiterEventFeature;