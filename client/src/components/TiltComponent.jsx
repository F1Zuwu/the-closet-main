import React from 'react'
import Tilt from "react-parallax-tilt";


const TiltComponent = (props) => {
    return (
        <Tilt glareEnable={true} tiltMaxAngleX={10} 
        tiltMaxAngleY={10} perspective={1000} 
        glareColor={"rgb(255,255,255)"}>
            {props.children}
            <div class="absolute translate-x-4 -translate-y-9 opacity-0 item-name">
                <h1 class="font-w-title">{props.cardName}</h1>
            </div>
        </Tilt>
    )
}

export default TiltComponent;