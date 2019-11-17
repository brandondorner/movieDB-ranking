import React from 'react';
import Query from './Query/Query';
import MovieResults from './MovieResults/MovieResults'

class QueryAndResultsParent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            queryResults:[],
            title: 'Titanic',
            yearStart: '1900',
            yearEnd: '2020',
            sortBy: 'title',
            order: 'asc',
            limit:'10'
        }
    }

          //grabbing initial table data
          componentDidMount() {
            fetch('http://localhost:3000/')
              .then(response => response.json())
              .then(data => {
                  this.setState({ queryResults: [...data] })});
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
               order: this.state.order,
               limit: this.state.limit
            })
        })
        //after data is sent, receive the response
        .then(response => response.json())
        // .then(data => console.log(data, 'query'))
        .then(data => {
            this.setState({
                queryResults:[...data],
            })
        })
        .then(console.log(this.state.queryResults, 'queryResults'))
    } 

    render(){
        return(
            <div>
                <Query 
                    onSubmitQuery={this.onSubmitQuery} 
                    title={this.state.title} 
                    onInputChange ={this.onInputChange} 
                />
                <MovieResults 
                    queryResults ={this.state.queryResults} 
                />

            </div>
        )
    }
}

export default QueryAndResultsParent