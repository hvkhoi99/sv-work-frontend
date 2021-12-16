import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FindCadidatesPage from './pages/Candidates';

RecruiterFindFeature.propTypes = {

};

function RecruiterFindFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={FindCadidatesPage}/>
      </Switch>
    </>
  );
}

export default RecruiterFindFeature;