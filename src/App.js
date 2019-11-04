import React from 'react';
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
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



class App extends React.Component {
  constructor(){
    super()
    this.state = {
      route: 'signin'
    }
  }

  //this function when ran will change the route state
  onRouteChange = (newRoute) => {
    this.setState({route : newRoute});
  }


  render(){
    return (
      <div className="app">
        <Particles className='particles'
          params ={particlesParams}
        />
        <Navigation onRouteChange={this.onRouteChange} />

        {/* setting up conditional of being signed in */}
        {/* if route is sign in, then render signin. if not, render everything else */}
        {/* SignIn passes down prop onRouteChange */}
        { this.state.route === "signin"
        ? <SignIn onRouteChange={this.onRouteChange}/>
        : <div>
            <Logo />
            <Query />
            <MovieResults />
          </div>
        }
      </div>
    );
  }
 
}

export default App;
