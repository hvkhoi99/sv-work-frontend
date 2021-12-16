import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterCreateEventPage from './pages/CreatePage';
import RecruiterMainEventPage from './pages/MainPage';

RecruiterEventFeature.propTypes = {

};

function RecruiterEventFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={match.url} component={RecruiterMainEventPage} />
        <Route path={`${match.url}/create`} component={RecruiterCreateEventPage} />
      </Switch>
    </>
  );
}

export default RecruiterEventFeature;