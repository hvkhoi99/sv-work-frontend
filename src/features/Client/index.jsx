import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingUI from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HomePage from './Home';

ClientFeature.propTypes = {

};

function ClientFeature(props) {
  const match = useRouteMatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <>
        <Header />
        <Switch>
          <Route exact path={match.url} component={HomePage} />
        </Switch>
        <Footer />
      </>
    )

  return <>{currentUI}</>;
}

export default ClientFeature;