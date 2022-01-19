import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import RecruiterAccountPage from 'features/Recruiter/Me/pages/Account';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentDashboardPage from './pages/StudentDashboard';
import StudentProfilePage from './pages/StudentProfile';

StudentMeFeature.propTypes = {

};

function StudentMeFeature(props) {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Switch>
        <Redirect exact from={`${match.url}/dashboard`} to={`${match.url}/dashboard/applied-jobs`}/>
        <Route exact path={`${match.url}/dashboard/applied-jobs`} component={StudentDashboardPage} />
        <Route exact path={`${match.url}/dashboard/followed-companies`} component={StudentDashboardPage} />
        <Route exact path={`${match.url}/dashboard/saved-jobs`} component={StudentDashboardPage} />
        <Route exact path={`${match.url}/dashboard/invited-jobs`} component={StudentDashboardPage} />
        <Redirect exact from={`${match.url}/profile`} to={`${match.url}/profile/info`} />
        <Route exact path={`${match.url}/profile/info`} component={StudentProfilePage} />
        <Route exact path={`${match.url}/profile/resume`} component={StudentProfilePage} />
        <Route exact path={`${match.url}/account`} component={RecruiterAccountPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default StudentMeFeature;