import React from 'react';
import {HashRouter, Switch, Route, } from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login/index'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact component={Home}  path='/'/>
        <Route component={Login}  path='/login'/>
      </Switch>
    </HashRouter>
  );
}

export default App;
