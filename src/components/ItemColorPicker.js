import React from "react"

import "./css/ItemColorPicker.css"

import { colors } from "./Colors"

export default function ItemColorPicker(props) {
    return (
        <div className="colors-box">
            <div className="prompt--name">Please select upto three colors</div>
            <div className="colors-list">
                {colors.map(color => (<div key={color.id} className="color--circle" style={{backgroundColor: color.css}}></div>))}
            </div>
        </div>
    )
}