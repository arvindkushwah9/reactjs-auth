import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../src/_components';
import { HomePage } from '../src/HomePage';
import { LoginPage } from '../src/LoginPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="jumbotron">
      <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
              <Router>
                  <div>
                      <PrivateRoute exact path="/" component={HomePage} />
                      <Route path="/login" component={LoginPage} />
                  </div>
              </Router>
          </div>
      </div>
  </div>
  );
}

export default App;

