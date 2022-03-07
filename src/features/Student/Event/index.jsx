import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import DetailEventPage from 'features/Recruiter/Event/pages/DetailEvent';
import RecruiterMainEventPage from 'features/Recruiter/Event/pages/MainPage';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchEventPage from 'features/Recruiter/Event/pages/SearchEvent';
import RecruiterCreateEventPage from 'features/Recruiter/Event/pages/CreatePage';
import EventDashboardPage from 'features/Recruiter/Event/pages/EventDashboardPage';
import { PrivateRouteStudent } from 'components/PrivateRoute';

StudentEventFeature.propTypes = {

};

function StudentEventFeature(props) {
  const user = useSelector((state) => state.user.current);
  const match = useRouteMatch();

  const currentUI = user.role_id === 2
    ? (
      <Redirect exact to="/recruiter" component={RecruiterHomeFeature} />
    ) : (
      <>
        <Header />
        <Switch>
          <Route exact path={match.url} component={RecruiterMainEventPage} />
          <Route exact path={`${match.url}/search`} component={SearchEventPage} />
          <PrivateRouteStudent exact path={`${match.url}/create`} component={RecruiterCreateEventPage} />
          <Redirect
            exact
            from={`${match.url}/dashboard`}
            to={`${match.url}/dashboard/posted-event`}
          />
          <PrivateRouteStudent exact path={`${match.url}/dashboard/posted-event`} component={EventDashboardPage} />
          <PrivateRouteStudent exact path={`${match.url}/dashboard/joined-event`} component={EventDashboardPage} />
          <PrivateRouteStudent exact path={`${match.url}/dashboard/closed-event`} component={EventDashboardPage} />
          <Redirect
            exact
            from={`${match.url}/dashboard/posted-event/:id`}
            to={`${match.url}/dashboard/posted-event/:id/detail`}
          />
          <PrivateRouteStudent exact path={`${match.url}/dashboard/posted-event/:id/detail`} component={DetailEventPage} />
          <PrivateRouteStudent exact path={`${match.url}/dashboard/joined-event/:id/detail`} component={DetailEventPage} />
          <PrivateRouteStudent exact path={`${match.url}/dashboard/closed-event/:id/detail`} component={DetailEventPage} />
          <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/detail`} />
          <Route exact path={`${match.url}/:id/detail`} component={DetailEventPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </>
    )

  return (
    <>
      {currentUI}
    </>
  );
}

export default StudentEventFeature;