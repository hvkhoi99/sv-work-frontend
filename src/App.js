import LoadingUI from 'components/Loading';
import NotFoundPage from 'components/NotFound';
import AdminFeature from 'features/Admin';
import ClientFeature from 'features/Client';
import EventPage from 'features/Client/Event';
import SignUpPage from 'features/Client/SignUp';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={LoadingUI}>
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
      </Suspense>
    </div>
  );
}

export default App;
