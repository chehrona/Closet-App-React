import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ClothesItem(props) {
    return (
        <div className="item-wrapper">
            <img src={props.imageURL} className="item-img" />
            <FontAwesomeIcon icon={faPenSquare} /> 
            <FontAwesomeIcon icon={faTrashCan} />
            {/* <div class="deleteImagePopup disabledPopup">Delete</div> */}
        </div>
    )
}