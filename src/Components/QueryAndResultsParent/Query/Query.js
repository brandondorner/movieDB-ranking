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
            <h4>View and sort movies of various genres and years!</h4>
            <div className="query-box">
                <form className='query-container' method="POST" action='/query'>
                    <input 
                        className='title'
                        name="title" 
                        placeholder="Search Title, ex: Titanic" 
                        // value = {this.props.title}
                        onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}>
                    </input>
                    <div className="bottom-query">
                        <div>
                            <label>Sort By</label>
                            <div>
                                <select name="sortBy" onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}>
                                    <option value='none'>None</option>
                                    <option value="title">Title</option>
                                    <option value="genres">Genres</option>
                                    <option value="movie_year">Year</option>
                                    <option value='rating'>Rating</option>
                                </select>
                                <select name="order" onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}>
                                    <option value="asc">Ascending</option>
                                    <option value='desc'>Descending</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label> Limit results to</label>
                            <div>
                                <input 
                                    className='limit'
                                    type="number" 
                                    name="limit" 
                                    value= {this.props.limit} 
                                    placeholder="10"
                                    onChange = {event => this.props.onInputChange(event.target.value, event.target.name)}/>
                            </div>
                        </div>
                        <div>
                            <label>In year range of</label>
                            <div>
                                <input 
                                    className='year'
                                    type="number" 
                                    name="yearStart" 
                                    value={this.props.yearStart}
                                    placeholder="1900"
                                    onChange = {event => this.props.onInputChange(event.target.value, event.target.name)} />
                                <label> - </label> 
                                <input 
                                    className='year'
                                    type="number"  
                                    name="yearEnd" 
                                    value= {this.props.yearEnd}
                                    placeholder="2018"
                                    onChange = {event => this.props.onInputChange(event.target.value, event.target.name)} />
                            </div>
                        </div>
                        <button className='query-submit' onClick={this.props.onSubmitQuery}>Search</button>
                    </div>
                </form>
            </div>
        </div>
    )}
}

export default Query