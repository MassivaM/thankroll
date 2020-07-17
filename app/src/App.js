import React from 'react';
import Home from './components/Home'
import './sass/base.scss'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="app">
      <NavBar/>
      <Home/>
    </div>

  );
}

export default App;
