import React from "react";

class Query extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
   
    render(){
    return (
        <div>
            <h1>The Movie Database </h1>
            <h4>View and rate movies of various genres and years!</h4>
            <div className="query-container">
                <form method="POST" action='/query'>
                    <input 
                        name="title" 
                        placeholder="Search Title" 
                        value = {this.props.title}
                        onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}>
                    </input>
                    <label>Sort By:</label>
                    <select name="sortBy" onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}>
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
                        value= {this.props.limit} 
                        placeholder="25"
                        onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}/>
                    <label>From year</label>
                    <input 
                        type="number" 
                        name="yearStart" 
                        value={this.props.yearStart}
                        placeholder="1970"
                        onChange = {event => this.props.onInputChange(event.target.value, event.target.name)} />
                    <label>to year</label>
                    <input 
                        type="number"  
                        name="yearEnd" 
                        value= {this.props.yearEnd}
                        placeholder="1980"
                        onChange = {event => this.props.onInputChange(event.target.value, event.target.name)} />
                    <button onClick={this.props.onSubmitQuery}>Search</button>
                </form>
            </div>
        </div>
    )}
}

export default Query