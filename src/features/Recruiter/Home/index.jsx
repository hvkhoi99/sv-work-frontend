import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingUI from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterHomePage from './pages/RecruiterHome';

RecruiterHomeFeature.propTypes = {

};

function RecruiterHomeFeature(props) {
  const match = useRouteMatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);

    };
  }, []);

  const currentUI = isLoading
    ?
    // <div className="loading-ui">
      <LoadingUI />
    // </div>
    : (
      <>
        <Header />
        <Switch>
          <Route exact path={match.url} component={RecruiterHomePage} />
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

export default RecruiterHomeFeature;