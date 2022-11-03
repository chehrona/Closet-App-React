import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ClothesItem(props) {
    const [isSelected, setIsSelected] = React.useState(false);

    function selectsItems(e) {
        props.picksItemsForLooks(e);
        setIsSelected(prevState => !prevState);
    }

    return (
        <div className={isSelected ? "item-wrapper item-selected" : "item-wrapper"} onClick={selectsItems}>
            <img src={props.source} className="item-img" />
            <FontAwesomeIcon icon={faPenSquare} className="item-edit"/> 
            <FontAwesomeIcon icon={faTrashCan} className="item-delete"/>
            {/* <div class="deleteImagePopup disabledPopup">Delete</div> */}
        </div>
    )
}