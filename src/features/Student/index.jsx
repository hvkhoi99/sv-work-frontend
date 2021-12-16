import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingUI from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentEventFeature from './Event';
import StudentFindFeature from './Find';
import StudentHomeFeature from './Home';

StudentFeature.propTypes = {

};

function StudentFeature(props) {
  const match = useRouteMatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <>
        <Header />
        <Switch>
          <Route exact path={match.url} component={StudentHomeFeature} />
          <Route path={`${match.url}/event`} component={StudentEventFeature} />
          <Route path={`${match.url}/find-jobs`} component={StudentFindFeature} />
        </Switch>
        <Footer />
      </>
    )

  return <>{currentUI}</>;
}

export default StudentFeature;