import Footer from 'components/Footer';
import Header from 'components/Header';
import LoadingUI from 'components/Loading';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentHomePage from './pages/StudentHome';

StudentHomeFeature.propTypes = {

};

function StudentHomeFeature(props) {
  const roleId = parseInt(localStorage.getItem('role_id'));
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

  const currentUI = roleId === 2 ? (
    <Redirect exact to="/recruiter" component={RecruiterHomeFeature} />
  ) : (
    isLoading
      ? <LoadingUI />
      : (
        <>
          <Header />
          <Switch>
            <Route exact path={match.url} component={StudentHomePage} />
          </Switch>
          <Footer />
        </>
      )
  );

  return (
    <>
      {/* <Switch>
        <Route exact path={match.url} component={StudentHomePage} />
      </Switch> */}
      {currentUI}
    </>
  );

}

export default StudentHomeFeature;