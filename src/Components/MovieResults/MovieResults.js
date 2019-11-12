import React from 'react';

class MovieResults extends React.Component{

    constructor() {
        super();
        this.state = {
          data: []
        };
      }
      componentDidMount() {
        fetch('http://localhost:3000/')
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data })});
      }

    render(){
    return(
        <div>
            {this.state.data.map(movie => {
                return <div>{movie.title}</div>
            })}
            {this.state.title}            
        </div>
    )
    }
}

export default MovieResults