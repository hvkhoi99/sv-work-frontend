import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEaJSqwXBi9pu7Ue3JzSA9uupRhnxY-34",
  authDomain: "sv-work-56ffe.firebaseapp.com",
  databaseURL: "https://sv-work-56ffe-default-rtdb.firebaseio.com",
  projectId: "sv-work-56ffe",
  storageBucket: "sv-work-56ffe.appspot.com",
  messagingSenderId: "601232019308",
  appId: "1:601232019308:web:7da62bf236846f05f9ed49",
  measurementId: "G-6R6Z8P1G1V"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });