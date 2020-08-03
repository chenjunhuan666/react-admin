import React from 'react';
import {BrowserRouter, Switch, Route, } from 'react-router-dom'

import Login from './pages/Login/index'
import Index from './pages/Index/index'
import PrivateRouter from './privateRouter/index'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact render={()=><Login />}  path='/'/>
        <PrivateRouter component={Index}  path='/index'/>
      </Switch> 
    </BrowserRouter>
  );
}

export default App;
