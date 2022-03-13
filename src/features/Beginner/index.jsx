import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ConfirmFirstUpdatePage from './pages/ConfirmFirstUpdate';
import RecruiterUpdateProfilePage from './pages/RecruiterUpdateProfile';
import StudentUpdateProfilePage from './pages/StudentUpdateProfile';

BeginnerFeature.propTypes = {

};

function BeginnerFeature(props) {
  const match = useRouteMatch();

  return (
    <>
    <Switch>
      <Route exact path={`${match.url}`} component={ConfirmFirstUpdatePage} />
      <Route exact path={`${match.url}/recruiter`} component={RecruiterUpdateProfilePage} />
      <Route exact path={`${match.url}/student`} component={StudentUpdateProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
    </>
  );
}

export default BeginnerFeature;