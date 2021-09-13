import React, { useEffect } from "react";
import "./css/plugins.css";
import "./css/style.css";
import "./css/templete.css";
import "./css/skin/skin-1.css";
import firebase from "./firebase";
import Markup from "./markup/Markup";

function App() {
  useEffect(() => {
    if (window.navigator.userAgent.includes("Safari")) {
    }
    if (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Edge")) {
      const messaging = firebase.messaging();
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then((token) => {
          console.log(token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <div className="App">
      <Markup />
    </div>
  );
}

export default App;
