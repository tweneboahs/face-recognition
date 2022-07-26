import React from "react";
import "./BoundingFaceBox.css"

const BoundingFaceBox = ({boxes}) => {
    const { topRow, rightCol, bottomRow, leftCol } = boxes;
    return (
        <div className='face-box'>
            <div className='bounding-box' style={{top:topRow, right:rightCol, bottom:bottomRow, left:leftCol}}></div>
        </div>
    );
}

export default BoundingFaceBox;