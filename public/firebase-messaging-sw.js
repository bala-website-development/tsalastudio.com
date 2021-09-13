importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "56861130108",
});
const initMessaging = firebase.messaging();
