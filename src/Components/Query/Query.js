import React from "react";
import MovieResults from ''

class Query extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Titanic',
            yearStart: '1970',
            yearEnd: '1980',
            sortBy: 'title',
            limit:'10'
        }
    }


    //event.target.name
    //could make all one function
    onSortByChange = (event) => {
        this.setState({sortBy: event.target.value})
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onYearStartChange = (event) => {
        this.setState({yearStart: event.target.value})
    }

    onYearEndChange = (event) => {
        this.setState({yearEnd: event.target.value})
    }

    onLimitChange = (event) => {
        this.setState({limit: event.target.value})
    }

    onSubmitQuery = (event) => {
        event.preventDefault()

        //send info to backend
        fetch('http://localhost:3000/query', {
            //telling fetch what to send and how to send it
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               title: this.state.title,
               yearStart: this.state.yearStart,
               yearEnd: this.state.yearEnd,
               sortBy: this.state.sortBy,
               limit: this.state.limit
            })
        })
        //after data is sent/receieved, respond with data
        .then(response => response.json())
        .then(data => console.log(data, 'query'))
        // .then(function on movieresults())
    } 
    render(){
    return (
        <div>
            <h1>The Movie Database </h1>
            <h4>View and rate movies of various genres and years!</h4>
            <div className="query-container">
                <form method="POST" action='/query'>
                    <input 
                        name="title-search" 
                        placeholder="Search Title" 
                        value={this.state.title}
                        onChange = {this.onTitleChange}>
                    </input>
                    <label>Sort By:</label>
                    <select name="sortBy" onChange={this.onSortByChange}>
                        <option value='none'>None</option>
                        <option value="title">Title</option>
                        <option value="genres">Genres</option>
                        <option value="movie_year">Year</option>
                        <option value='rating'>Rating</option>
                    </select>
                    <label> Limit results to:</label>
                    <input 
                        type="number" 
                        name="limit" 
                        value="100" 
                        placeholder="100"
                        onChange = {this.onLimitChange}/>
                    <label>From year</label>
                    <input 
                        type="number" 
                        name="yearStart" 
                        value="1972" 
                        placeholder="1972"
                        onChange = {this.onYearStartChange} />
                    <label>to year</label>
                    <input 
                        type="number"  
                        name="yearEnd" 
                        value="1996" 
                        placeholder="1996"
                        onChange= {this.onYearEndChange} />
                    <button onClick={this.onSubmitQuery}>Search</button>
                </form>
            </div>
        </div>
    )}
}

export default Query