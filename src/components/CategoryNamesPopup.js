import React from "react";

export default function CategoryNamesPopup(props) {
    function categoryPicked() {
        props.chooseItemCategory(props.name)
    }

    return (
        <div className={props.extraClassName + " db-category-name"} onClick={categoryPicked}>
            <img src={props.icon} className="db-category-icon"/>{props.name}
        </div>
    )
}