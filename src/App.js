import React from 'react';
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Register from './Components/Register/Register'
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
      route: 'signin',
      isSignedIn: false
    }
  }


  //this function when ran will change the route state
  onRouteChange = (newRoute) => {
    //changes signed in or signed out state
    if (newRoute === 'signout' ){
      this.setState({isSignedIn: false})
    }else if (newRoute === 'home'){
      this.setState({isSignedIn: true})
    }

    //changes route
    this.setState({route : newRoute});
  }


  render(){
    //could destructure to remove this.state here
    
    //     setting up conditional of being signed in 
    //     if route is sign in, then render signin. same for home, other, etc
    //     passes down prop onRouteChange 
    if (this.state.route === 'home'){
      return(
        <div className="app">
          <Particles className='particles'
            params ={particlesParams} />
          <Navigation onRouteChange={this.onRouteChange} />
          <div>
            <Logo />
            <Query />
            <MovieResults />
          </div>
        </div>
      )


    }else if (this.state.route === "signin"){
      return (
        <div className="app">
            <Particles className='particles'
              params ={particlesParams}/>
            <SignIn onRouteChange={this.onRouteChange}/>
         </div>
      )


    }else{
      return (
        <div className="app">
          <Particles className='particles'
            params ={particlesParams}/>
          <Register onRouteChange={this.onRouteChange} />
        </div>
      )
    }
  }
 
}

export default App;
