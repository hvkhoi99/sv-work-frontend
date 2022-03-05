import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentFindFeature from './Find';
import StudentHomeFeature from './Home';

StudentFeature.propTypes = {

};

function StudentFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={StudentHomeFeature} />
        <Route path={`${match.url}/find-jobs`} component={StudentFindFeature} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default StudentFeature;