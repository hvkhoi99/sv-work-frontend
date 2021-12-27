
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateRecruitmentPage from './pages/CreateRecruitment';
import DetailsRecruitmentPage from './pages/DetailsRecruitment';

RecruitmentFeature.propTypes = {

};

function RecruitmentFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/:recruitmentId`} component={DetailsRecruitmentPage} />
      <Route exact path={`${match.url}/create`} component={CreateRecruitmentPage} />
    </Switch>
  );
}

export default RecruitmentFeature;