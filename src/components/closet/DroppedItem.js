import React, { useState } from "react"

export default function DroppedItem(props) {
    return (
        <img className="look--item" src={props.source} />
    )
}