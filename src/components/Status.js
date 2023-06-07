import React from 'react'

export default function Status(props) {
    return (
        <div className="status" id="status">
            {props.statusText}
        </div>
    )
}