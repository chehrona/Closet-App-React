import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ClothesItem(props) {
    return (
        <div className="item-wrapper">
            <img src={props.source} className="item-img" />
            <FontAwesomeIcon icon={faPenSquare} className="item-edit"/> 
            <FontAwesomeIcon icon={faTrashCan} className="item-delete"/>
            {/* <div class="deleteImagePopup disabledPopup">Delete</div> */}
        </div>
    )
}