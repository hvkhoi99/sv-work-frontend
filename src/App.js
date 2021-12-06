import LoadingUI from 'components/Loading';
import NotFoundPage from 'components/NotFound';
import AdminFeature from 'features/Admin';
import ClientFeature from 'features/Client';
import EventPage from 'features/Client/Event';
import SignUpPage from 'features/Client/SignUp';
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
            <Route path="/admin" component={AdminFeature} />
            <Route path="/event" component={EventPage} />
            <Route path="/sign-up" component={SignUpPage} />

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
        </SnackbarProvider>
      </Suspense>
    </div>
  );
}

export default App;
