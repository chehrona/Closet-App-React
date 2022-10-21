import React from "react";

import "./css/IconsDropDown.css"

import {icons} from "./Icons"

export default function IconDropDown() {
    return (
        <div className="dropdown-container">
            {icons.map(icon => (<img className="category-icon" key={icon.id} src={icon.path}/>))}
        </div>
    )
}