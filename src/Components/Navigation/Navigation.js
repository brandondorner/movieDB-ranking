import React from 'react';
import "./nav.css"

//receives onRouteChange function as prop from App.js
//when Sign Out is clicked, run function onRouteChange, and pass route param of 'signin'
const Navigation = ({ onRouteChange }) => {
    return (
        <nav className='nav'>
            {/* added anonymous arrow function so that onRouteChange only runs onClick.*/}
            <p onClick={() => onRouteChange('signin')}>Sign Out</p>
        </nav>
    )
}

export default Navigation;