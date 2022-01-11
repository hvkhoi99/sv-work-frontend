import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CandidateDetailPage from './pages/CandidateDetail';
import FindCadidatesPage from './pages/Candidates';

RecruiterFindFeature.propTypes = {

};

function RecruiterFindFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={FindCadidatesPage} />
        <Route exact path={`${match.url}/:id`} component={CandidateDetailPage} />
      </Switch>
    </>
  );
}

export default RecruiterFindFeature;