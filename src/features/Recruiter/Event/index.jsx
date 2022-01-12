import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterCreateEventPage from './pages/CreatePage';
import DetailEventPage from './pages/DetailEvent';
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
        <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/detail`} />
        <Route exact path={`${match.url}/:id/detail`} component={DetailEventPage} />
        <Route exact path={`${match.url}/create`} component={RecruiterCreateEventPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default RecruiterEventFeature;