import Footer from 'components/Footer';
import Header from 'components/Header';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import StudentHomePage from './pages/StudentHome';

StudentHomeFeature.propTypes = {

};

function StudentHomeFeature(props) {
  const roleId = parseInt(localStorage.getItem('role_id'));
  const match = useRouteMatch();

  const currentUI = roleId === 2 ? (
    <Redirect exact to="/recruiter" component={RecruiterHomeFeature} />
  ) : (
        <>
          <Header />
          <Switch>
            <Route exact path={match.url} component={StudentHomePage} />
          </Switch>
          <Footer />
        </>
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