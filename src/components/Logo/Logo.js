import React from "react";
import Tilt from 'react-tilt';
import detect from './detect.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma3 mt0'>
            <Tilt className="Tilt br3 shadow-2" options={{ max : 65 }} style={{ height: 200, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <p>face recognition</p>
                    <img style={{paddingTop:'5px'}} alt='logo of a face' src={detect}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;