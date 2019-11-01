import React from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo"
import './css/app.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Logo />
    </div>
  );
}

export default App;
