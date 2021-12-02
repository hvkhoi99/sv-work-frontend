import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EventPage from './Event';
import HomePage from './Home';
import SignUpPage from './SignUp';

ClientFeature.propTypes = {

};

function ClientFeature(props) {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default ClientFeature;