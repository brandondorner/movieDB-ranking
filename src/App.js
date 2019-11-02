import React from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo"
import Query from "./Components/Query/Query"
import MovieResults from "./Components/MovieResults/MovieResults"
import './css/app.css';
import Particles from 'react-particles-js';


const particlesParams = {
  particles : {
    number:{
      value: 200, 
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  return (
    <div className="app">
      <Particles className='particles'
        params ={particlesParams}
      />
      <Navigation />
      <Logo />
      <Query />
      <MovieResults />
    </div>
  );
}

export default App;
