import React from "react"

import "../css/PicPreviewPopup.css"

export default function PicPreviewPopup(props) {
    return (
        <div className="popup--container">
            <div className="action-button--wrapper">
                <div className="action--button" onClick={(e) => props.closesPopup(e)}>Cancel</div>
                <div className="action--label">Import Image</div>
                <div className="action--button" onClick={props.handlesImgPopupOne}>Next</div>
            </div>
            <div className="uploaded-img-container">
                <img className="uploaded-img" src={props.fileSource}/>
            </div>
        </div>
    )
}