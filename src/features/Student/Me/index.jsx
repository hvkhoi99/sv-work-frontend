import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingUI from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentAccountPage from './pages/Account';
import StudentDashboardPage from './pages/StudentDashboard';
import StudentProfilePage from './pages/StudentProfile';

StudentMeFeature.propTypes = {

};

function StudentMeFeature(props) {
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
          <Route path={`${match.url}/dashboard`} component={StudentDashboardPage} />
          <Route path={`${match.url}/profile`} component={StudentProfilePage} />
          <Route path={`${match.url}/account`} component={StudentAccountPage} />
        </Switch>
        <Footer />
      </>
    )

  return <>{currentUI}</>;
}

export default StudentMeFeature;