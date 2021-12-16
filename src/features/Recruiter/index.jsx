import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterEventFeature from './Event';
import RecruiterFindFeature from './Find';
import RecruiterMeFeature from './Me';

RecruiterFeature.propTypes = {

};

function RecruiterFeature(props) {
  const match = useRouteMatch();

  const currentUI = (
    <>
      <Header />
      <Switch>
        <Route path={`${match.url}/event`} component={RecruiterEventFeature} />
        <Route path={`${match.url}/find-candidates`} component={RecruiterFindFeature} />
        <Route path={`${match.url}/me`} component={RecruiterMeFeature} />
      </Switch>
      <Footer />
    </>
  );

  return <>{currentUI}</>;
}

export default RecruiterFeature;