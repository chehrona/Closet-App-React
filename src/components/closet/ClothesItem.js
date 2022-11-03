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
        <div className="item-wrapper">
            <img src={props.source} className={isSelected ? "item-img item-selected" : "item-img"} onClick={selectsItems} />
            <FontAwesomeIcon icon={faPenSquare} className="item-edit"/> 
            <FontAwesomeIcon icon={faTrashCan} className="item-delete"/>
            {/* <div class="deleteImagePopup disabledPopup">Delete</div> */}
        </div>
    )
}