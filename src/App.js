import LoadingUI from 'components/Loading';
import NotFoundPage from 'components/NotFound';
import { PrivateRouteRecruiter, PrivateRouteStudent, PrivateRouteUserAuth } from 'components/PrivateRoute';
import AdminFeature from 'features/Admin';
import AuthFeature from 'features/Auth';
import RecruiterFeature from 'features/Recruiter';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import StudentEventFeature from 'features/Student/Event';
import StudentFindFeature from 'features/Student/Find';
import StudentHomeFeature from 'features/Student/Home';
import StudentMeFeature from 'features/Student/Me';
import { SnackbarProvider } from 'notistack';
import { createRef, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  const notistackRef = createRef();

  return (
    <div className="App">
      <Suspense fallback={LoadingUI}>
        <SnackbarProvider
          persist="true"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          ref={notistackRef}
          autoHideDuration={2500}
          anchororigintopright={{ marginTop: '50px' }}>
          <Router>
            <Switch>
              {/* <Redirect exact from="/" to="/home" /> */}
              <Route path="/" exact component={StudentHomeFeature} />
              <Route path="/recruiter" exact component={RecruiterHomeFeature} />

              <PrivateRouteUserAuth path="/auth" component={AuthFeature} />

              <Route path="/event" component={StudentEventFeature} />
              <Route path="/find-jobs" component={StudentFindFeature} />
              
              <PrivateRouteStudent path="/me" component={StudentMeFeature} />
              <PrivateRouteRecruiter path="/recruiter" component={RecruiterFeature} />

              <Route path="/admin" component={AdminFeature} />

              <Route path="*" component={NotFoundPage} />

            </Switch>
          </Router>
        </SnackbarProvider>
      </Suspense>
    </div>
  );
}

export default App;
