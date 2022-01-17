import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import JobDetailPage from './pages/JobDetail';

JobFeature.propTypes = {

};

function JobFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/detail`} />
        <Route exact path={`${match.url}/:id/detail`} component={JobDetailPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default JobFeature;