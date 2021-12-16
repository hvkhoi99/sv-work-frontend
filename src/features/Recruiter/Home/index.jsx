import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RecruiterHomePage from './pages/RecruiterHome';

RecruiterHomeFeature.propTypes = {

};

function RecruiterHomeFeature(props) {
  // const roleId = parseInt(localStorage.getItem('role_id'));
  const match = useRouteMatch();

  const currentUI = 
  // roleId === 2 ? (
    <>
      <Header />
      <Switch>
        <Route exact path={match.url} component={RecruiterHomePage} />
      </Switch>
      <Footer />
    </>
  // ) : (
  //   <Redirect exact to="/" component={StudentHomePage} />
  // )

  return (
    <>
      {/* <Switch>
        <Route exact path={match.url} component={RecruiterHomePage} />
      </Switch> */}
      {currentUI}
    </>
  );
}

export default RecruiterHomeFeature;