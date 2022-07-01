import React from "react";
import './ImageLinkForm.css'

//remember the onInputChange and onSubmit come from state in App.js
//use destructuring on the next line so you dont have to use props 
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This face recognition app will detect faces in pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input 
                        className='f4 pa2 w-70 center'type='text' 
                        onChange={onInputChange}
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
                
            </div>
        </div>
    );
}

export default ImageLinkForm;