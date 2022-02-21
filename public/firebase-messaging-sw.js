// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});