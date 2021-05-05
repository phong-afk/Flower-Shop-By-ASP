import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDxyF0CwNGEO2n9ezJP4xqEgpB3r12-H0s",
  authDomain: "flowersshopapp.firebaseapp.com",
  databaseURL: "https://flowersshopapp.firebaseio.com",
  projectId: "flowersshopapp",
  storageBucket: "flowersshopapp.appspot.com",
  messagingSenderId: "540911484523",
  appId: "1:540911484523:web:141e5da863eb7887e7bb2e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
