import React from "react";
import BoundingFaceBox from "../BoundingFaceBox/BoundingFaceBox";

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt="" id='inputimage' src={imageUrl} width='500px' height='auto'/>
                {boxes.map((box) =>{
                    return (
                        <BoundingFaceBox boxes={box} />
                    )
                })}
            </div>
        </div>
    );
}

export default FaceRecognition;