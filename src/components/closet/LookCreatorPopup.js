import React, { useRef } from "react";
import LookItem from "./LookItem";

import "../css/LookCreatorPopup.css"
import DroppedItem from "./DroppedItem";

export default function LookCreatorPopup(props) {
    const [droppedItems, setDroppedItems] = React.useState([]);
    const [draggedItems, setDraggedItems] = React.useState([...props.items]);
 
    function dragStart(e) {
        e.dataTransfer.setData("drag-item", e.target.attributes[3].value);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        const droppedItemURL = e.dataTransfer.getData("drag-item");

        setDroppedItems(prevArr => [...prevArr, droppedItemURL]);
        setDraggedItems(draggedItems.filter(item => item !== droppedItemURL)) 
    }

    console.log(draggedItems)
    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={() => props.closesPopup()}>Cancel</div>
                <div className="action--label">Create a look</div>
                <div className="action--button">Save</div>
            </div>
            <div className="look-creator-container">
                <div className="selected-items-preview">
                    {draggedItems.map((item, i) => <LookItem key={i} id={i} source={item} 
                                                    dragStart={dragStart} />)}
                </div>
                <div className="look-creator-box" onDrop={drop} onDragOver={dragOver}>
                    {droppedItems.map((item, i) => <DroppedItem source={item} key={i} drop={drop} dragOver={dragOver} />)}
                </div>
                
            </div>  
        </div>
    )
}