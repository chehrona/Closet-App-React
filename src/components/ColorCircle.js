import React from "react"

import "./css/ColorCircle.css"

export default function ColorCircle(props) {
    const [isChosen, setIsChosen] = React.useState(false);

    function colorPicked() {
        setIsChosen(!isChosen);
        props.chooseItemColors(props.css)
    }

    return (
        <div key={props.id} className={props.extraClassName + (isChosen ? " color--circle color-picked" : " color--circle")} style={{backgroundColor: props.css}} 
        value={props.css} onClick={colorPicked}>       
        </div>)
}