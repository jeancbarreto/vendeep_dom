import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import singup from './Pages/SingUp';
import question from "./Pages/QuestionView";
import answer from "./Pages/AnswerView";
import admin from "./Pages/AdminView";
import { Menu } from '@material-ui/core';


const Root = () => {
    return (
      <Router basename="/app">
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/SingUp" component={singup} />
          <Route exact path="/Questions" component={question} />
          <Route exact path="/Answers" component={answer} />
          <Route exact path="/AdminView" component={admin} />
        </Switch>
      </Router>
    );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
