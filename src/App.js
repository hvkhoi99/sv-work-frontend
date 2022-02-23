import LoadingUI from 'components/Loading';
import NotFoundPage from 'components/NotFound';
import { PrivateRouteFirstUpdateProfile, PrivateRouteRecruiter, PrivateRouteStudent, PrivateRouteUserAuth } from 'components/PrivateRoute';
import ReactNotificationComponent from 'components/Notifications/ReactNotification';
import AdminFeature from 'features/Admin';
import AuthFeature from 'features/Auth';
import BeginnerFeature from 'features/Beginner';
import RecruiterFeature from 'features/Recruiter';
import RecruiterHomeFeature from 'features/Recruiter/Home';
import CompanyFeature from 'features/Student/Company';
import StudentEventFeature from 'features/Student/Event';
import StudentFindFeature from 'features/Student/Find';
import StudentHomeFeature from 'features/Student/Home';
import JobFeature from 'features/Student/Job';
import StudentMeFeature from 'features/Student/Me';
import firebase from 'firebase/compat/app';
import { onMessageListener } from 'init-fcm';
import { SnackbarProvider } from 'notistack';
import { createRef, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

function App() {
  const notistackRef = createRef();

  const [showNoti, setShowNoti] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  // const { enqueueSnackbar } = useSnackbar();

  // Configure Firebase.
  const config = {
    apiKey: "AIzaSyAEaJSqwXBi9pu7Ue3JzSA9uupRhnxY-34",
    authDomain: "sv-work-56ffe.firebaseapp.com",
  };

  !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

  console.log({ showNoti }, { notification });

  onMessageListener()
    .then((payload) => {
      const newTitle = JSON.parse(payload.notification.title);
      const newBody = JSON.parse(payload.notification.body);
      setNotification({
        title: newTitle.title,
        body: newBody.description
      });
      setShowNoti(true);
      console.log({ payload }, {newTitle: newTitle, newBody: newBody});
    })
    .catch((err) => console.log("failed: ", err));

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
          {showNoti ? (
            <ReactNotificationComponent
              title={notification.title}
              body={notification.body}
            />
          ) : (
            <></>
          )}
          <Router>
            <Switch>
              {/* <Redirect exact from="/" to="/home" /> */}
              <Route path="/" exact component={StudentHomeFeature} />
              <PrivateRouteRecruiter path="/recruiter" exact component={RecruiterHomeFeature} />

              <PrivateRouteUserAuth path="/auth" component={AuthFeature} />

              <Route path="/event" component={StudentEventFeature} />
              <Route path="/find-jobs" component={StudentFindFeature} />
              <Route path="/recruitment" component={JobFeature} />
              <Route path="/company" component={CompanyFeature} />

              <PrivateRouteFirstUpdateProfile path="/first-update" component={BeginnerFeature} />

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
