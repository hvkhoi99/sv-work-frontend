import 'aos/dist/aos.css';
import store from 'app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        transitionDuration={{ enter: 300, exit: 150 }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
