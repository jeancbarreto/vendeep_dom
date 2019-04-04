import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import singup from './Pages/SingUp';
import questions from "./Pages/QuestionsView";
import answer from "./Pages/AnswerView";
import admin from "./Pages/AdminView";
import formDynamic from "./Pages/viewForm"
import createform from "./Pages/createFormView";
import createQuestion from "./Pages/QuestionCreate";
import { Menu } from '@material-ui/core';

firebase.initializeApp({
  apiKey: "AIzaSyAJFgEwi22nTg0VtwJetkSFPeH06bNay5c",
  authDomain: "project-wpa-cj.firebaseapp.com",
  databaseURL: "https://project-wpa-cj.firebaseio.com",
  projectId: "project-wpa-cj",
  storageBucket: "project-wpa-cj.appspot.com",
  messagingSenderId: "52637781214"
});

const Root = () => {
    return (
      <Router basename="/app">
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/SingUp" component={singup} />
          <Route exact path="/Questions" component={questions} />
          <Route exact path="/CreateQuestion/:id" component={createQuestion} />
          <Route exact path="/Answers" component={answer} />
          <Route exact path="/AdminView" component={admin} />
          <Route exact path="/Form" component={formDynamic} />
          <Route exact path="/FormCreate/" component={createform} />
        </Switch>
      </Router>
    );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
