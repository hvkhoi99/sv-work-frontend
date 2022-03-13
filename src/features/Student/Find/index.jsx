import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import FindJobsPage from './pages/Jobs';

StudentFindFeature.propTypes = {

};

function StudentFindFeature(props) {
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const match = useRouteMatch();

  const currentUI = roleId === 2 ? (
    <Redirect exact to="/recruiter" component={RecruiterHomeFeature} />
  ) : (
    <>
      <Header />
      <Switch>
        <Route exact path={`${match.url}`} component={FindJobsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  )

  return (
    <>
      {/* <Switch>
        <Route exact path={`${match.url}`} component={FindJobsPage} />
      </Switch> */}
      {currentUI}
    </>
  );
}

export default StudentFindFeature;