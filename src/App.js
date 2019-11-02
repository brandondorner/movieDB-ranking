import React from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo"
import Query from "./Components/Query/Query"
import './css/app.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <Logo />
      <Query />
      {/* <QueryResults /> */}
    </div>
  );
}

export default App;
