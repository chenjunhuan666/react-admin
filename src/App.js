import React from 'react';
import {HashRouter, Switch, Route, } from 'react-router-dom'
import Login from './pages/Login/index'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact component={Login}  path='/'/>
      </Switch>
    </HashRouter>
  );
}

export default App;
