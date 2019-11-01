import React from "react";
import Tilt from 'react-tilt'
import camera from "./camera.png";
import "./logo.css";


const Logo = () => {
    return(
        <div className="logo-box">
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner">
                    <img className='logo-img' src={camera} alt="logo"/>
                </div> 
            </Tilt>
        </div>
    )
}

export default Logo