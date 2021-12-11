import LoadingUI from 'components/Loading';
import NotFoundPage from 'components/NotFound';
import { PrivateRouteUserAuth } from 'components/PrivateRoute';
import AdminFeature from 'features/Admin';
import AuthFeature from 'features/Auth';
import ClientFeature from 'features/Client';
import EventPage from 'features/Client/Event';
import { SnackbarProvider } from 'notistack';
import { createRef, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

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
            <Route exact path="/" component={ClientFeature} />
            <PrivateRouteUserAuth path="/auth" component={AuthFeature} />
            <Route path="/admin" component={AdminFeature} />
            <Route path="/event" component={EventPage} />

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
        </SnackbarProvider>
      </Suspense>
    </div>
  );
}

export default App;
