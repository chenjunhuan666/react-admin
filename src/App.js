import React from 'react';
import {HashRouter, Switch, Route, } from 'react-router-dom'

import Login from './pages/Login/index'
import Index from './pages/Index/index'
import PrivateRouter from './privateRouter/index'
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact render={()=><Login />}  path='/'/>
        <PrivateRouter component={Index}  path='/index'/>
      </Switch> 
    </HashRouter>
  );
}

export default App;
