import React from 'react';

class SignIn extends React.Component {
    //receives props from app.js
    constructor(props){
        super(props)
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    // Whenever password or email is entered into sign in,
    // update state to the input
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        //send info to backend
        fetch('http://localhost:3000/signin', {
            //telling fetch what to send and how to send it
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        //after data is sent/receieved, respond with data
        //if response has a user with an id, AKA login was succesful and the user was responded,
        //change the route to 'home'
        .then(response => response.json())
        .then(user => {
            if (user.id){
                this.props.onRouteChange('home')
            }
        })
    }

    render(){
        const { onRouteChange } = this.props;
     return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            //Whenever input is changed, run this
                            onChange = {this.onEmailChange}
                        />
                    </div> 
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            //Whenever input is changed, run this
                            onChange = {this.onPasswordChange}
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
                        value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p 
                        onClick= {() => onRouteChange('register')} 
                        className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
    }
}

export default SignIn