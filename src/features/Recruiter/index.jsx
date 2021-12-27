import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterEventFeature from './Event';
import RecruiterFindFeature from './Find';
import RecruiterMeFeature from './Me';
import RecruitmentFeature from './Recruitment';

RecruiterFeature.propTypes = {

};

function RecruiterFeature(props) {
  const match = useRouteMatch();

  const currentUI = (
    <>
      <Header />
      <Switch>
        {/* <Route path="/recruiter" exact component={RecruiterHomeFeature} /> */}
        <Route path={`${match.url}/event`} component={RecruiterEventFeature} />
        <Route path={`${match.url}/find-candidates`} component={RecruiterFindFeature} />
        <Route path={`${match.url}/me`} component={RecruiterMeFeature} />
        <Route path={`${match.url}/recruitment`} component={RecruitmentFeature} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );

  return <>{currentUI}</>;
}

export default RecruiterFeature;