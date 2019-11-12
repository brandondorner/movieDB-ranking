import React from 'react';
import './css/MovieResults.css'

class MovieResults extends React.Component{

    constructor() {
        super();
        this.state = {
          data: []
        };
      }

      //grabbing data
      componentDidMount() {
        fetch('http://localhost:3000/')
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data })});
      }

    render(){
    return(
        <div>            
            <table className="movie-table">
                <tbody>
                    <tr>
                        <th>Movie Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                    {this.state.data.map(movie => {
                        return(
                        <tr>
                            <td data-th='Movie Title'>{movie.title}</td>
                            <td data-th='Genre'>{movie.genres}</td>
                            <td data-th='Year'>{movie.movie_year}</td>
                            <td data-th='Rating'>{movie.rating.substring(0,3)} / 5</td>
                        </tr>
                        )
                })}
                </tbody>
            </table>
        </div>
    )
    }
}

export default MovieResults