import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentEventFeature from './Event';
import StudentFindFeature from './Find';
import StudentHomeFeature from './Home';
import JobFeature from './Job';

StudentFeature.propTypes = {

};

function StudentFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={StudentHomeFeature} />
        <Route path={`${match.url}/event`} component={StudentEventFeature} />
        <Route path={`${match.url}/find-jobs`} component={StudentFindFeature} />
        <Route path={`${match.url}/job`} component={JobFeature} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default StudentFeature;