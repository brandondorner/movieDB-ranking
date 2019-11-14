import React from 'react';
import Query from './Query/Query';
import MovieResults from './MovieResults/MovieResults'

class QueryAndResultsParent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            title: 'Titanic',
            yearStart: '1970',
            yearEnd: '1980',
            sortBy: 'title',
            limit:'10'
        }
    }

    //changes input using value and name properties, then updates state
    onInputChange = (value, name) => {
        this.setState({[name]: value })
    }

    //When form is submitted, run this
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
        return(
            <div>
                <Query 
                    onSubmitQuery={this.onSubmitQuery} 
                    title={this.state.title} 
                    onInputChange ={this.onInputChange} 
                />
                <MovieResults onSubmitQuery={this.onSubmitQuery} />
            </div>
        )
    }
}

export default QueryAndResultsParent