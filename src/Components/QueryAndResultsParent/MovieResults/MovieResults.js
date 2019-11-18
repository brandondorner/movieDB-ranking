import React from 'react';
import './css/MovieResults.css'

class MovieResults extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
      }
     //could remove state

    render(){
    return(
        <div> 

            
            {/* if no results then have some kind of no results text */}
            <table className="movie-table">
                <tbody>
                    <tr>
                        <th>Movie Title</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                    {this.props.queryResults.map(movie => {
                        return(
                        <tr key={movie.movieid}>
                            <td data-th='Movie Title'>{movie.title}</td>
                            {/* For genres, replace '|' with ', ' so that it looks cleaner and text wraps */}
                            <td data-th='Genre'>{movie.genres.replace(/\|/g, ", ")}</td>
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