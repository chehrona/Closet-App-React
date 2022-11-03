import React from "react";

import "../css/IconsDropDown.css"

import {icons} from "./Icons"

export default function IconsDropDown(props) {
    return (
        <div className="dropdown-container">
            {icons.map(icon => (<img className="category-icon" key={icon.id} src={icon.path}
                                onClick={e => props.getCategoryIcon(e)}/>))}
        </div>
    )
}