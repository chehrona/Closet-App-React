import React from "react";

export default function LookItem(props) {
    return (
        <img className="look--item" draggable id={props.id} src={props.source} 
            onDragStart={(e) => props.dragStart(e, props.id)} />
    )
}