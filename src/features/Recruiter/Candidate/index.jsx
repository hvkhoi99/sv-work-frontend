import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import CandidateDetailPage from '../Find/pages/CandidateDetail';

CandidateFeature.propTypes = {

};

function CandidateFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/info`} />
      <Route exact path={`${match.url}/:id/info`} component={CandidateDetailPage} />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default CandidateFeature;