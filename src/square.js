import React from 'react'

export default function square(props) {
    return (
        <button className={`square ${props.highlighted ? 'highlighted' : ''}`} onClick={props.onClick}>
            {props.value}
        </button>
    )
}