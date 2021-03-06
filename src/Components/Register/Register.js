import React from 'react';

class Register extends React.Component{
    //receives props from app.js
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }

    // Whenever password or email or name is entered into sign in,
    // update state to the input
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
 
    onSubmitSignIn = (event) => {
        //send info to backend
        console.log('hi')
        fetch('https://moviedb-dorner.herokuapp.com/register', {
            //telling fetch what to send and how to send it
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(console.log('hi2'))
        .then(response => response.json())
        .then(console.log('hi4'))
        .then(user => {
            //if user exists
            if (user.id){
                //when registering, automatically login to user and change route to home
                console.log('hi5')
                this.props.loadUser(user)
                this.props.onRouteChange('home')
                console.log('hi6')
            }
        })
    }
   
    render(){
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange = {this.onNameChange}
                                required
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                                required
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange= {this.onPasswordChange}
                                required
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input  
                            //onclick of sign in, run onRouteChange and passing param of 'home'
                            //added anonymous arrow function so that onRouteChange only runs after onClick
                            onClick= {this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register