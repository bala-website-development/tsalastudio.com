import firebase from "firebase";

const configfb = {
  /////new//// Jan 3 2021
  apiKey: "AIzaSyB4JcU0HlqeG9Z4L1PVuzHSbwu5IIsGQXE",
  authDomain: "tucfbclouddb.firebaseapp.com",
  databaseURL: "https://tucfbclouddb-default-rtdb.firebaseio.com",
  projectId: "tucfbclouddb",
  storageBucket: "tucfbclouddb.appspot.com",
  messagingSenderId: "630144356084",
  appId: "1:630144356084:web:cd09fed36cb2bcac2758a1",
  measurementId: "G-H3YBW1GSN8",
};
firebase.initializeApp(configfb);

export default firebase;
