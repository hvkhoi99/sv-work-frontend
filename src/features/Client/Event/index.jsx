import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateEventPage from './pages/CreatePage';
import MainEventPage from './pages/MainPage';

EventPage.propTypes = {

};

function EventPage(props) {
  const match = useRouteMatch();

  return (
    <>
      <Header/>
      <Switch>
        <Route path={match.url} exact component={MainEventPage} />
        <Route path={`${match.url}/create`} component={CreateEventPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer/>
    </>
  );
}

export default EventPage;