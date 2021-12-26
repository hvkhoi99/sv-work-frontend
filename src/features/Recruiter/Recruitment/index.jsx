
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailsRecruitmentPage from './pages/DetailsRecruitment';

RecruitmentFeature.propTypes = {

};

function RecruitmentFeature(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={DetailsRecruitmentPage} />
    </Switch>
  );
}

export default RecruitmentFeature;