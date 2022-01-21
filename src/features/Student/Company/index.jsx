import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import CompanyDetailPage from './pages/CompanyDetailPage';
// import PropTypes from 'prop-types';

CompanyFeature.propTypes = {

};

function CompanyFeature(props) {
  const user = useSelector((state) => state.user.current);
  const match = useRouteMatch();

  const currentUI = user.role_id === 2
    ? (
      <Redirect exact to="/recruiter" component={RecruiterHomeFeature} />
    ) : (
      <>
        <Header />
        <Switch>
        <Redirect exact from={`${match.url}/:id`} to={`${match.url}/:id/info`} />
        <Route exact path={`${match.url}/:id/info`} component={CompanyDetailPage} />
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

export default CompanyFeature;