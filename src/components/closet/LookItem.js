import React from "react";

export default function LookItem(props) {
    const [x, setX]= React.useState(0);
    const [y, setY]= React.useState(0);

    function handleStop(e){
        console.log(e)
        // setX(dragElement.x)
        // setY(dragElement.y)
    };


    return (
        <img className="look--item" draggable id={props.id} src={props.source} 
            onDragStart={(e) => props.dragStart(e, props.id)} onDragEnd={handleStop} 
            position={{x: x, y: y}}/>
    )
}