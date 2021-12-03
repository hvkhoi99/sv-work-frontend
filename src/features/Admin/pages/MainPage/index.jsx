import HelloAdmin from 'features/Admin/components/HelloAdmin';
import AdminNav from 'features/Admin/components/Nav';
import Sidebar from 'features/Admin/components/Sidebar';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminDashboardPage from '../Dashboard';
import VerificationPage from '../VerificationPage';

AdminMainPage.propTypes = {

};

function AdminMainPage(props) {
  const match = useRouteMatch();
  console.log(match)
  
  return (
    <>
      <Sidebar />
      <HelloAdmin/>
      <AdminNav />
      <Switch>
        <Route exact path={match.url} component={AdminDashboardPage} />
        <Route path={`${match.url}/verification`} component={VerificationPage} />
      </Switch>
    </>
  );
}

export default AdminMainPage;