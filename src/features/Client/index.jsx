import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HomePage from './Home';

ClientFeature.propTypes = {

};

function ClientFeature(props) {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={HomePage} />
      </Switch>
      <Footer />
    </>
  );
}

export default ClientFeature;