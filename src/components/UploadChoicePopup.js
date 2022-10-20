import React from "react";
import "./css/UploadPopup.css"

export default function UploadChoicePopup(props) {
    return (
        <div className="popup-container">
            <div className="input-box">
                <input type="file" accept="image/*" onChange={e => props.picUploaded(e)}/>
            </div>
            <div className="popup-triangle"></div>
        </div>
    )
}