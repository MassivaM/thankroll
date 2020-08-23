import React from 'react';
import Home from './pages/home'
import './sass/base.scss'
import NavBar from './components/NavBar'
import Swipper from './components/Swipper'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import PageRenderer from './page-renderer'

import { HashRouter } from 'react-router-dom'

function App() {
  
  
  

  return (
    <HashRouter>
    <div className="App">
    
      <NavBar/>
      <Switch>

        <Route path="/:page" component={PageRenderer} />
        
        <Route path="/" render={() => <Redirect to="/home" />}/>
        <Route component={() => 404} />
      </Switch>
     
     

    </div>

    </HashRouter>
  );
}

export default App;

