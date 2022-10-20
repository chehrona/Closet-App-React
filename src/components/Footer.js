import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function Footer(props) {
    return (
        <div className="closet-footer" onClick={(e) => props.popupHandler(e)}>
            <FontAwesomeIcon className="plus-sign" icon={faSquarePlus} />
            <div>Item</div>
        </div>
    )
}   