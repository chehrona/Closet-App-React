import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

import "./css/ImgInfoPopup.css"

import ItemColorPicker from "./ItemColorPicker"
import IconDropDown from "./IconsDropDown"

export default function ImgInfoPopup(props) {
    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Cancel</div>
                <div className="action--label">Save To</div>
                <div className="action--button" onClick={(e) => props.handleImgInfo(e)}>Done</div>
            </div>
            <div className="features-container">
                <div className="category-box">
                    <div className="prompt--name">Please select a category</div>
                    <div className="category-list">
                        <div className="category-info-wrapper">
                            <div className="drop-down-icon">
                                <FontAwesomeIcon icon={faAngleDown}/>
                                <IconDropDown />
                            </div>
                            <input className="category-name-input" placeholder="Add category"
                            onChange={(e) => props.getCategoryName(e)}/>
                        </div>
                    </div>
                </div>
                <ItemColorPicker />
            </div>
        </div>
    )
}


