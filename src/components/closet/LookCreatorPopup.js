import React from "react";

export default function LookCreatorPopup(props) {
    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={() => props.closesPopup()}>Cancel</div>
                <div className="action--label">Create a look</div>
                <div className="action--button">Save</div>
            </div>
            <div className="look-creator-container">
                <div className="selected-items-preview"></div>
                <div className="look-creator-box"></div>
            </div>  
        </div>
    )
}