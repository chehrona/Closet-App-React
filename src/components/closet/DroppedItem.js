import React, { useState, useRef } from "react"
import Draggable, {DraggableCore} from "react-draggable";

export default function DroppedItem(props) {
    const [createdLooks, setCreatedLooks] = React.useState([]);
    const nodeRef = React.useRef(null)
    const [x, setX]= React.useState(0);
    const [y, setY]= React.useState(0);

    function handleDragStart(e, data) {
        console.log("hello")
    }

    function handleDrag(e){
        console.log(e.nativeEvent.x)         
        setX(e.nativeEvent.clientX)
        setY(e.nativeEvent.clientY)
    };

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={{x: 0, y: 0}}
        bounds={{left: 0, top: 0, right: 330, bottom: 430}}
                    onMouseDown={handleDragStart} onMouseUp={handleDrag}>
                    <img ref={nodeRef} className="look--item" src={props.source} 
                />
        </Draggable>
    )
}