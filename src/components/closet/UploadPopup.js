import React from "react";

import 'reactjs-popup/dist/index.css';

export default function UploadPopup(props) {
  return (<div className="popup-container">
                <div className="choice-popup">
                    <div className="choice-1 choice-item" onClick={e => props.choiceHandler(e)}>Upload Photo</div>
                    <div className="choice-2 choice-item">Import from Web</div>
                </div>
                <div className="popup-triangle"></div>
            </div>)
}